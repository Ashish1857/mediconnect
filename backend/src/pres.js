const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const cors = require('cors');
const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const storage = new Storage({
  keyFilename: path.join(__dirname, 'keys', 'mediconnect-419020-df117ed26fe7.json'),
});
const bucket = storage.bucket('mediconnect_pres');
const UploadInfo = require('./UploadInfoModel'); // 引入模型

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
    const formattedMobileNumber = req.body.mobileNumber.replace(/\D/g, ''); // 格式化手机号为纯数字

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
        metadata: { contentType: req.file.mimetype },
    });

    blobStream.on('error', (err) => {
        console.error(err);
        return res.status(500).send({ message: 'Error uploading file' });
    });

    blobStream.on('finish', async () => {
        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        try {
            const uploadInfo = new UploadInfo({
                mobileNumber: formattedMobileNumber, // 使用格式化后的手机号
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                addressLine1: req.body.addressLine1,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                country: req.body.country,
                cardHolder: req.body.cardHolder,
                cardNumber: req.body.cardNumber,
                expiry: req.body.expiry,
                cvv: req.body.cvv,
                fileUrl
            });
            await uploadInfo.save();

            res.status(200).send({ message: 'File and information submitted successfully', fileUrl });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error saving upload information' });
        }
    });

    blobStream.end(req.file.buffer);
});

app.get('/healthvault/:mobileNumber', async (req, res) => {
    const formattedMobileNumber = req.params.mobileNumber.replace(/\D/g, ''); // 格式化手机号为纯数字

    try {
        const records = await UploadInfo.find({ mobileNumber: formattedMobileNumber }).lean();

        // 异步地为所有记录中的每个文件生成签名URL
        const updatedRecords = await Promise.all(records.map(async (record) => {
            if (record.fileName) {
                const options = {
                    version: 'v4',
                    action: 'read',
                    expires: Date.now() + 15 * 60 * 1000, // URL 15分钟后过期
                };

                try {
                    // 为文件名生成签名URL
                    const [url] = await storage
                        .bucket(bucket.name)
                        .file(record.fileName)
                        .getSignedUrl(options);

                    return {...record, signedUrl: url}; // 将签名URL添加到记录中
                } catch (error) {
                    console.error('Error generating signed URL for:', record.fileName, error);
                    return {...record, signedUrl: 'Error generating signed URL'}; // 错误处理
                }
            } else {
                return record; // 没有fileName的记录保持不变
            }
        }));

        res.json(updatedRecords); // 发送带有签名URL的更新记录
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching records' });
    }
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
