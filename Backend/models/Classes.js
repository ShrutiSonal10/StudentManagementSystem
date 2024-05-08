const mongoose = require('mongoose');

// Define Schema
const classSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  students: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    attended: {
      type: Boolean,
      default: false
    }
  }]
});

// Create Model
const Class = mongoose.model('Class', classSchema);

module.exports = Class;
