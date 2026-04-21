const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  profileImage: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving - FIXED VERSION
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// Compare password method
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Async compare method for promises
userSchema.methods.comparePasswordAsync = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
