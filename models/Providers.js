const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const ProvidersSchema = new Schema({
  firstName: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Please supply a lastname',
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  speciality: {
    type: mongoose.Schema.ObjectId,
    ref: 'Specialties',
    required: 'You must supply an specialtie'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  }, 
  projectedStartDate: {
    type: Date
  },
  employerId: {
    type: Number
  },
  providerType: {
    type: String
  },
  staffStatus: {
    type: String
  },
  assignedTo: {
    type: String
  },
  status: {
    type: String
  },
  createdBy: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: Number
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// function autopopulate(next) {
//   this.populate('speciality');
//   next()
// }

//ProvidersSchema.pre('find', autopopulate);
//ProvidersSchema.pre('findOne', autopopulate);
ProvidersSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Providers', ProvidersSchema);