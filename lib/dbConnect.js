const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://fahim2204:fahim2204@cluster0.md64krj.mongodb.net/terra");
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
