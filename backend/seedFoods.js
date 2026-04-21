const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('./models/Category');
const Food = require('./models/Food');

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Get all categories
    const categories = await Category.find();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.nameEn] = cat._id;
    });
    
    // Clear existing foods
    await Food.deleteMany({});
    console.log('Cleared existing foods');
    
    const foods = [
      // Breakfast items
      { nameEn: 'Firfir', nameAm: 'ፍርፍር', price: 120, category: categoryMap['Breakfast'], descriptionEn: 'Shredded injera with spicy sauce', descriptionAm: 'ከቅመም መረቅ ጋር የተፈጨ እንጀራ', isPopular: true, isActive: true, preparationTime: 10 },
      { nameEn: 'Cheese Omelette', nameAm: 'አይብ ኦሜሌት', price: 90, category: categoryMap['Breakfast'], descriptionEn: 'Three-egg omelette with cheese', descriptionAm: 'ከአይብ ጋር የሶስት እንቁላል ኦሜሌት', isPopular: false, isActive: true, preparationTime: 10 },
      
      // Lunch items
      { nameEn: 'Doro Wat', nameAm: 'ዶሮ ወጥ', price: 250, category: categoryMap['Lunch'], descriptionEn: 'Spicy chicken stew with boiled egg', descriptionAm: 'በተቀቀለ እንቁላል የተዘጋጀ ቅመም ዶሮ ወጥ', isPopular: true, isActive: true, preparationTime: 25 },
      { nameEn: 'Tibs', nameAm: 'ጥብስ', price: 280, category: categoryMap['Lunch'], descriptionEn: 'Sautéed meat with vegetables', descriptionAm: 'ከአትክልት ጋር የተጠበሰ ሥጋ', isPopular: true, isActive: true, preparationTime: 20 },
      { nameEn: 'Shiro Wat', nameAm: 'ሽሮ ወጥ', price: 180, category: categoryMap['Lunch'], descriptionEn: 'Chickpea stew with berbere', descriptionAm: 'ከበርበሬ ጋር የተዘጋጀ የሽምብራ ወጥ', isPopular: false, isActive: true, preparationTime: 20 },
      
      // Dinner items
      { nameEn: 'Kitfo', nameAm: 'ክትፎ', price: 300, category: categoryMap['Dinner'], descriptionEn: 'Minced raw beef with spices', descriptionAm: 'ከቅመም ጋር የተዘጋጀ የተፈጨ ጥሬ ሥጋ', isPopular: true, isActive: true, preparationTime: 15 },
      { nameEn: 'Mixed Grill', nameAm: 'ሚክስ ግሪል', price: 450, category: categoryMap['Dinner'], descriptionEn: 'Assorted grilled meats with sides', descriptionAm: 'ከጎን ምግቦች ጋር የተለያዩ የተጠበሰ ሥጋዎች', isPopular: true, isActive: true, preparationTime: 30 },
      
      // Traditional items
      { nameEn: 'Injera', nameAm: 'እንጀራ', price: 50, category: categoryMap['Traditional'], descriptionEn: 'Traditional Ethiopian flatbread', descriptionAm: 'ባህላዊ የኢትዮጵያ እንጀራ', isPopular: true, isActive: true, preparationTime: 5 },
      { nameEn: 'Gomen', nameAm: 'ጎመን', price: 120, category: categoryMap['Traditional'], descriptionEn: 'Collard greens with spices', descriptionAm: 'ከቅመም ጋር የተዘጋጀ ጎመን', isPopular: false, isActive: true, preparationTime: 15 },
      
      // Modern items
      { nameEn: 'Margherita Pizza', nameAm: 'ማርጌሪታ ፒዛ', price: 350, category: categoryMap['Modern'], descriptionEn: 'Fresh mozzarella, tomato sauce, basil', descriptionAm: 'ትኩስ ሞዛሬላ፣ የቲማቲም መረቅ፣ ባሲል', isPopular: true, isActive: true, preparationTime: 20 },
      { nameEn: 'Classic Burger', nameAm: 'ክላሲክ በርገር', price: 250, category: categoryMap['Modern'], descriptionEn: 'Beef patty, lettuce, tomato, cheese', descriptionAm: 'የበሬ ሥጋ፣ ሰላጣ፣ ቲማቲም፣ አይብ', isPopular: true, isActive: true, preparationTime: 15 },
      
      // Drinks
      { nameEn: 'Ethiopian Coffee', nameAm: 'የኢትዮጵያ ቡና', price: 40, category: categoryMap['Drinks'], descriptionEn: 'Traditional Ethiopian coffee', descriptionAm: 'ባህላዊ የኢትዮጵያ ቡና', isPopular: true, isActive: true, preparationTime: 5 },
      { nameEn: 'Fresh Juice', nameAm: 'ትኩስ ጭማቂ', price: 60, category: categoryMap['Drinks'], descriptionEn: 'Seasonal fresh fruit juice', descriptionAm: 'የወቅቱ ትኩስ የፍራፍሬ ጭማቂ', isPopular: true, isActive: true, preparationTime: 5 },
      { nameEn: 'Soft Drinks', nameAm: 'ለስላሳ መጠጦች', price: 30, category: categoryMap['Drinks'], descriptionEn: 'Coke, Sprite, Fanta', descriptionAm: 'ኮክ፣ ስፕራይት፣ ፋንታ', isPopular: false, isActive: true, preparationTime: 2 }
    ];
    
    // Insert foods
    const inserted = await Food.insertMany(foods);
    console.log(`✅ Added ${inserted.length} food items:`);
    inserted.forEach(food => {
      console.log(`   - ${food.nameEn} (${food.nameAm}) - ${food.isActive ? 'ACTIVE' : 'INACTIVE'}`);
    });
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedFoods();
