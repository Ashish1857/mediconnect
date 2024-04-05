const mongoose = require('./db');

const UploadInfoSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  firstName: String,
  lastName: String,
  addressLine1: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  cardHolder: String,
  cardNumber: String,
  expiry: String,
  cvv: String,
  fileUrl: { type: String, required: true }
});

const UploadInfo = mongoose.model('UploadInfo', UploadInfoSchema);

module.exports = UploadInfo;
