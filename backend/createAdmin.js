const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Check if admin exists
    const existingAdmin = await usersCollection.findOne({ email: 'admin@gedrestaurant.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists!');
      console.log('Email: admin@gedrestaurant.com');
      console.log('Password: admin123');
      process.exit();
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin
    await usersCollection.insertOne({
      name: 'Admin User',
      email: 'admin@gedrestaurant.com',
      phone: '0911111111',
      password: hashedPassword,
      role: 'admin',
      address: 'Addis Ababa',
      city: 'Addis Ababa',
      createdAt: new Date()
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@gedrestaurant.com');
    console.log('🔑 Password: admin123');
    console.log('👑 Role: admin');
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
