import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// 设置PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const HealthVault = () => {
    const [records, setRecords] = useState([]);
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        const mobileNumber = localStorage.getItem('mobileNumber') ? localStorage.getItem('mobileNumber').replace(/\D/g, '') : '';
        if (!mobileNumber) {
            console.log('No mobile number found');
            return;
        }

        const fetchRecords = async () => {
            try {
                const response = await fetch(`http://localhost:3001/healthvault/${mobileNumber}`);
                if (!response.ok) throw new Error('Failed to fetch records');
                
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecords();
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <h2>Health Vault</h2>
            {records.length > 0 ? (
                records.map((record, index) => (
                    <div key={index}>
                        {Object.entries(record).map(([key, value]) => (
                            value && <p key={key}>{`${key}: ${value}`}</p>
                        ))}
                        {record.fileUrl && (
                            <div>
                                <h3>PDF Document:</h3>
                                <Document
                                    file={record.fileUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                    ))}
                                </Document>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No records found</p>
            )}
        </div>
    );
};
