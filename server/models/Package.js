const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  packageId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate a unique package ID before saving
PackageSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  
  try {
    const latestPackage = await this.constructor.findOne({}, {}, { sort: { 'packageId': -1 } });
    if (!latestPackage) {
      this.packageId = 'PKG-1001';
    } else {
      const lastId = parseInt(latestPackage.packageId.split('-')[1]);
      this.packageId = `PKG-${lastId + 1}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Package', PackageSchema);