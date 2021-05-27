const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VaccinationSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: false
  },
  amka: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  dateDose1: {
    type: Date,
    required: true
  },
  doseOneCompleted:{
    type: Boolean,
    default: false
  },
  dateDose2: {
    type: Date,
    required: true
  },
  doseOTwoCompleted:{
    type: Boolean,
    default: false
  },
  vaccineBrand: {
    type: String,
    required: false
  },
  symptoms: {
    type: String,
    required: false
  },
  comments: {
    type: String,
    required: false
  },
  stage: {
    type: String,
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Vaccination = mongoose.model("vaccinations", VaccinationSchema);