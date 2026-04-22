const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const fixUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Get all users
    const users = await usersCollection.find({}).toArray();
    console.log(`Found ${users.length} users`);
    
    for (const user of users) {
      // Check if password is already hashed (starts with $2b$)
      if (user.password && !user.password.startsWith('$2b$')) {
        console.log(`Fixing password for: ${user.email}`);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await usersCollection.updateOne(
          { _id: user._id },
          { $set: { password: hashedPassword } }
        );
        console.log(`  ✓ Password fixed for ${user.email}`);
      } else {
        console.log(`  ✓ Password already hashed for ${user.email}`);
      }
    }
    
    // Create admin if not exists
    const adminExists = await usersCollection.findOne({ email: 'admin@gedrestaurant.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await usersCollection.insertOne({
        name: 'Admin User',
        email: 'admin@gedrestaurant.com',
        phone: '0911111111',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date()
      });
      console.log('✅ Admin user created');
    } else {
      // Fix admin password if needed
      if (adminExists.password && !adminExists.password.startsWith('$2b$')) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await usersCollection.updateOne(
          { email: 'admin@gedrestaurant.com' },
          { $set: { password: hashedPassword } }
        );
        console.log('✅ Admin password fixed');
      }
    }
    
    console.log('\n✅ All users fixed!');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixUsers();
