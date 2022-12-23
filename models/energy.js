const mongoose = require('mongoose');

const energySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companyRegNo: {
    type: String,
    required: true
  },
  companyAddress: {
    type: String,
    required: true
  },
  structure: {
    type: String,
    required: true
  },
  energy: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  electricityDate: {
    type: Date,
    default: 'none'
  },
  gasDate: {
    type: Date,
    default: 'none'
  },
  electricConsume: {
    type: String,
    default: 'none'
  },
  gasConsume: {
    type: String,
    default: 'none'
  },
  electricMeterNo: {
    type: [String],
    default: 'none'
  },
  gasMeterNo: {
    type: [String],
    default: 'none'
  },
  electricBillDoc: {
    docName: {
      type: String,
      default: 'N/A'
    },
    docData: {
      type: String,
      default: 'N/A'
    }
  },
  gasBillDoc: {
    docName: {
      type: String,
      default: 'N/A'
    },
    docData: {
      type: String,
      default: 'N/A'
    }
  },
  gender: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dataprivacy: {
    type: String,
    required: true
  },
  agree: {
    type: Boolean,
    required: true
  }
});


module.exports = mongoose.models.Energy || mongoose.model('Energy', energySchema);
