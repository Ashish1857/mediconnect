require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI_SECONDARY;

console.log('MongoDB URI:', process.env.MONGO_URI_SECONDARY);


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

module.exports = mongoose;
