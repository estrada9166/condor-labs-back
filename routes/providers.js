const mongoose = require('mongoose');
const Providers = require('../models/Providers');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, middleName, speciality, email, projectedStartDate,
      employerId, providerType, staffStatus, assignedTo, status, createdBy,  createdAt,
      updatedBy, updatedAt } = req.body
    const provider = await (new Providers({ 
      firstName, 
      lastName, 
      middleName, 
      speciality, 
      email, 
      projectedStartDate,
      employerId, 
      providerType, 
      staffStatus, 
      assignedTo, 
      status, 
      createdBy,  
      createdAt,
      updatedBy, 
      updatedAt
    })).save()
    res.json(provider)
  } catch (err) {
    res.json(err.message)
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const provider = await Providers.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    })
    res.json(provider)
  } catch (err) {
    res.json(err.message)
  }
}

exports.getProviders = async (req, res) => {
  try {
    const allProviders = Providers.find()
    const countProviders = Providers.count()
    const [providers, count] = await Promise.all([allProviders, countProviders])
    res.json({providers, count})
  } catch (err) {
    res.json(err.message)
  }
}

exports.getProviderByEmail = async (req, res) => {
  try {
    const provider = await Providers.findOne({ email: req.params.email })
    res.json(provider)
  } catch (err) {
    res.json(err.message)
  }
}

exports.deleteProviderById = async (req, res) => {
  try {
    await Providers.findOneAndRemove({ _id: req.params.id })
    res.json('Successfully deleted')
  } catch (err) {
    res.json(err.message)
  }
}