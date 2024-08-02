const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  collegeEmailId: {
    type: String,
    required: true,
  },
  collegeRollNumber: {
    type: String,
    required: true,
  },
  numbers: {
    type: [Number],
    required: true,
  },
  alphabets: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);
