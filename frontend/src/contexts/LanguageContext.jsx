import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('gedLanguage');
    return saved === 'am' ? 'am' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('gedLanguage', language);
    window.dispatchEvent(new Event('languageChanged'));
    window.dispatchEvent(new Event('storage'));
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const translations = {
    en: {
      home: 'Home', menu: 'Menu', reservation: 'Reservation', orders: 'My Orders', about: 'About', contact: 'Contact', login: 'Login', logout: 'Logout', cart: 'Cart', admin: 'Admin Panel',
      welcome: 'Welcome to Ged Restaurant',
      heroTitle1: 'Authentic Ethiopian Cuisine', heroTitle2: 'Fresh Ingredients Daily', heroTitle3: 'Cozy Atmosphere',
      heroSub1: 'Experience the rich flavors of Ethiopia', heroSub2: 'Fresh ingredients for best taste', heroSub3: 'Perfect for family gatherings',
      shopNow: 'Order Now', callNow: 'Call Now',
      featuresTitle: 'Why Choose Ged Restaurant?',
      feature1Title: 'Authentic Taste', feature1Desc: 'Traditional recipes with modern touch',
      feature2Title: 'Fast Delivery', feature2Desc: 'Free delivery on orders over 200 ETB',
      feature3Title: 'Easy Booking', feature3Desc: 'Reserve your table online',
      feature4Title: 'Secure Payment', feature4Desc: 'Multiple payment options',
      categoriesTitle: 'Our Food Categories', viewAllCategories: 'View All', explore: 'Explore', items: 'Items',
      featuredDishes: 'Popular Dishes', viewAll: 'View Full Menu', addToCart: 'Add to Cart', price: 'ETB', popular: 'Popular',
      ctaTitle: 'Book Your Table Today!', ctaSubtitle: 'Best dining experience', reserveNow: 'Reserve Now',
      menuTitle: 'Our Menu', menuSubtitle: 'Discover our delicious dishes', search: 'Search menu items...',
      preparationTime: 'Prep Time', minutes: 'min', noItems: 'No items found',
      menuCategories: { all: 'All', breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', traditional: 'Traditional', modern: 'Modern', drinks: 'Drinks' },
      resTitle: 'Table Reservation', resSubtitle: 'Book your table online', formTitle: 'Reservation Details',
      name: 'Full Name', email: 'Email', phone: 'Phone', date: 'Date', time: 'Time', guests: 'Guests', occasion: 'Occasion',
      specialRequests: 'Special Requests', submit: 'Confirm Reservation', submitting: 'Submitting...',
      successTitle: 'Reservation Confirmed!', successMessage: 'Thank you! We will contact you shortly.', newReservation: 'Make Another Reservation',
      ordersTitle: 'My Orders', ordersSubtitle: 'Track your orders', activeOrders: 'Active Orders', orderHistory: 'Order History',
      orderId: 'Order ID', total: 'Total', status: 'Status', viewDetails: 'View Details', trackOrder: 'Track Order',
      reorder: 'Reorder', cancelOrder: 'Cancel', noActiveOrders: 'No active orders', noHistoryOrders: 'No order history',
      orderType: 'Order Type', deliveryAddress: 'Delivery Address',
      myProfile: 'My Profile', profileSubtitle: 'Manage your account information', personalInfo: 'Personal Information', myOrders: 'My Orders', addresses: 'Addresses', myCart: 'My Cart', myReservations: 'My Reservations',
      edit: 'Edit', save: 'Save', cancel: 'Cancel', delete: 'Delete', default: 'Default', addAddress: 'Add Address', homeAddress: 'Home Address', workAddress: 'Work Address',
      aboutTitle: 'About Us', aboutSubtitle: 'Discover the story behind Ged Restaurant', ourStory: 'Our Story', ourValues: 'Our Values', ourTeam: 'Meet Our Team', visitUs: 'Visit Us Today!', bookTable: 'Book a Table',
      contactTitle: 'Contact Us', contactSubtitle: 'We would love to hear from you', sendMessage: 'Send Us a Message', followUs: 'Follow Us', sending: 'Sending...', selectSubject: 'Select Subject', message: 'Your Message',
      emptyCart: 'Your cart is empty', emptyCartMsg: 'Add some delicious items from our menu', browseMenu: 'Browse Menu', cartTitle: 'Your Cart', cartSubtitle: 'Review your order before checkout',
      item: 'Item', quantity: 'Quantity', clearCart: 'Clear Cart', orderSummary: 'Order Summary', subtotal: 'Subtotal', deliveryFee: 'Delivery Fee', tax: 'Tax (5%)', free: 'Free', proceedToCheckout: 'Proceed to Checkout',
      checkoutTitle: 'Checkout', checkoutSubtitle: 'Complete your order', shippingInfo: 'Shipping Information', address: 'Address', city: 'City', orderNotes: 'Order Notes (optional)',
      cashOnDelivery: 'Cash on Delivery', payOnDelivery: 'Pay when you receive', chapaPayment: 'Chapa Payment', payOnline: 'Pay online with card or Telebirr', placeOrder: 'Place Order', processing: 'Processing...',
      orderSuccess: 'Order Placed Successfully!', orderSuccessMsg: 'Thank you for your order. We will contact you shortly.', viewOrders: 'View My Orders', continueShopping: 'Continue Shopping',
      welcomeBack: 'Welcome Back', createAccount: 'Create Account', loginToOrder: 'Login to continue ordering', signupToOrder: 'Sign up to start ordering', signup: 'Sign Up', fullName: 'Full Name', password: 'Password', confirmPassword: 'Confirm Password', forgotPassword: 'Forgot Password?', noAccount: "Don't have an account?", haveAccount: 'Already have an account?',
      adminPanel: 'Admin Panel', backToSite: 'Back to Site', recentOrders: 'Recent Orders', noOrders: 'No orders yet'
    },
    am: {
      home: 'መነሻ', menu: 'ምናሌ', reservation: 'ማስያዝ', orders: 'ትእዛዞቼ', about: 'ስለእኛ', contact: 'ያግኙን', login: 'ግባ', logout: 'ውጣ', cart: 'ጋሪ', admin: 'አስተዳዳሪ',
      welcome: 'እንኳን ወደ ገድ ሬስቶራንት በደህና መጡ',
      heroTitle1: 'ትክክለኛ የኢትዮጵያ ምግብ', heroTitle2: 'ትኩስ ንጥረ ነገሮች', heroTitle3: 'ምቹ ሁኔታ',
      heroSub1: 'የኢትዮጵያን ልዩ ጣዕም ይለማመዱ', heroSub2: 'ምርጥ ጣዕም ትኩስ ንጥረ ነገሮች', heroSub3: 'ለቤተሰብ ስብሰባ ተስማሚ',
      shopNow: 'አሁን ይዘዙ', callNow: 'አሁን ይደውሉ',
      featuresTitle: 'ለምን ገድ ሬስቶራንት?',
      feature1Title: 'ትክክለኛ ጣዕም', feature1Desc: 'ዘመናዊ ንክኪ ያላቸው ባህላዊ ምግቦች',
      feature2Title: 'ፈጣን አቅርቦት', feature2Desc: 'ከ200 ብር በላይ ነጻ አቅርቦት',
      feature3Title: 'ቀላል ማስያዝ', feature3Desc: 'ጠረጴዛዎን በመስመር ላይ ያስይዙ',
      feature4Title: 'ደህንነቱ የተጠበቀ ክፍያ', feature4Desc: 'የተለያዩ የክፍያ አማራጮች',
      categoriesTitle: 'የምግብ ምድቦች', viewAllCategories: 'ሁሉንም ይመልከቱ', explore: 'ያስሱ', items: 'ምግቦች',
      featuredDishes: 'ታዋቂ ምግቦች', viewAll: 'ሙሉ ምናሌ', addToCart: 'ወደ ጋሪ ጨምር', price: 'ብር', popular: 'ታዋቂ',
      ctaTitle: 'ጠረጴዛ ያስይዙ!', ctaSubtitle: 'ምርጥ የመመገቢያ ልምድ', reserveNow: 'አሁን ያስይዙ',
      menuTitle: 'ምናሌ', menuSubtitle: 'ጣፋጭ ምግቦቻችንን ይወቁ', search: 'ምግቦችን ይፈልጉ...',
      preparationTime: 'ዝግጅት ጊዜ', minutes: 'ደቂቃ', noItems: 'ምንም አልተገኘም',
      menuCategories: { all: 'ሁሉም', breakfast: 'ቁርስ', lunch: 'ምሳ', dinner: 'እራት', traditional: 'ባህላዊ', modern: 'ዘመናዊ', drinks: 'መጠጦች' },
      resTitle: 'ጠረጴዛ ማስያዝ', resSubtitle: 'ጠረጴዛዎን በመስመር ላይ ያስይዙ', formTitle: 'የማስያዣ ዝርዝሮች',
      name: 'ሙሉ ስም', email: 'ኢሜይል', phone: 'ስልክ', date: 'ቀን', time: 'ሰዓት', guests: 'እንግዶች', occasion: 'ዝግጅት',
      specialRequests: 'ልዩ ጥያቄ', submit: 'አረጋግጥ', submitting: 'በማስገባት ላይ...',
      successTitle: 'ተረጋግጧል!', successMessage: 'እናመሰግናለን! በቅርቡ እናገኝዎታለን።', newReservation: 'ሌላ ማስያዣ',
      ordersTitle: 'ትእዛዞቼ', ordersSubtitle: 'ትእዛዞችዎን ይከታተሉ', activeOrders: 'ንቁ ትእዛዞች', orderHistory: 'ታሪክ',
      orderId: 'ቁጥር', total: 'ጠቅላላ', status: 'ሁኔታ', viewDetails: 'ዝርዝር', trackOrder: 'ክትትል',
      reorder: 'እንደገና', cancelOrder: 'ሰርዝ', noActiveOrders: 'ምንም ንቁ ትእዛዝ የለም', noHistoryOrders: 'ምንም ታሪክ የለም',
      orderType: 'አይነት', deliveryAddress: 'አድራሻ',
      myProfile: 'መገለጫዬ', profileSubtitle: 'መለያ መረጃዎን ያስተዳድሩ', personalInfo: 'የግል መረጃ', myOrders: 'ትእዛዞቼ', addresses: 'አድራሻዎች', myCart: 'ጋሪዬ', myReservations: 'ማስያዣዎቼ',
      edit: 'አርትዕ', save: 'አስቀምጥ', cancel: 'ሰርዝ', delete: 'ሰርዝ', default: 'ነባሪ', addAddress: 'አድራሻ ጨምር', homeAddress: 'የቤት አድራሻ', workAddress: 'የስራ አድራሻ',
      aboutTitle: 'ስለእኛ', aboutSubtitle: 'የገድ ሬስቶራንት ታሪክ', ourStory: 'ታሪካችን', ourValues: 'እሴቶቻችን', ourTeam: 'ቡድናችን', visitUs: 'ዛሬ ይጎብኙን!', bookTable: 'ጠረጴዛ ያስይዙ',
      contactTitle: 'ያግኙን', contactSubtitle: 'ከእኛ ጋር መገናኘት እንወዳለን', sendMessage: 'መልእክት ላኩልን', followUs: 'ይከተሉን', sending: 'በማስገባት ላይ...', selectSubject: 'ርዕስ ይምረጡ', message: 'መልእክትዎ',
      emptyCart: 'ጋሪዎ ባዶ ነው', emptyCartMsg: 'ከምናሌአችን ጣፋጭ ምግቦችን ይጨምሩ', browseMenu: 'ምናሌ ይመልከቱ', cartTitle: 'ጋሪዎ', cartSubtitle: 'ከማዘዝዎ በፊት ትዕዛዝዎን ይገምግሙ',
      item: 'እቃ', quantity: 'ብዛት', clearCart: 'ጋሪ አጽዳ', orderSummary: 'የትእዛዝ ማጠቃለያ', subtotal: 'ንዑስ ድምር', deliveryFee: 'የማድረስ ክፍያ', tax: 'ግብር (5%)', free: 'ነጻ', proceedToCheckout: 'ወደ መግዣ ቀጥል',
      checkoutTitle: 'መግዣ', checkoutSubtitle: 'ትዕዛዝዎን ያጠናቅቁ', shippingInfo: 'የማድረሻ መረጃ', address: 'አድራሻ', city: 'ከተማ', orderNotes: 'የትእዛዝ ማስታወሻ (ካለ)',
      cashOnDelivery: 'በጥሬ ገንዘብ', payOnDelivery: 'ሲደርስ ይክፈሉ', chapaPayment: 'በቻፓ ክፍያ', payOnline: 'በካርድ ወይም በቴሌብር ይክፈሉ', placeOrder: 'ትእዛዝ አስገባ', processing: 'በሂደት ላይ...',
      orderSuccess: 'ትእዛዝ ተረጋግጧል!', orderSuccessMsg: 'ለትእዛዝዎ እናመሰግናለን። በቅርቡ እናገኝዎታለን።', viewOrders: 'ትእዛዞቼን ይመልከቱ', continueShopping: 'መግዛት ቀጥል',
      welcomeBack: 'እንኳን ደህና መጡ', createAccount: 'አካውንት ይፍጠሩ', loginToOrder: 'ለማዘዝ ይግቡ', signupToOrder: 'ለማዘዝ ይመዝገቡ', signup: 'ይመዝገቡ', fullName: 'ሙሉ ስም', password: 'የይለፍ ቃል', confirmPassword: 'የይለፍ ቃል አረጋግጥ', forgotPassword: 'የይለፍ ቃል ረሳሁ?', noAccount: 'አካውንት የለዎትም?', haveAccount: 'አካውንት አለዎት?',
      adminPanel: 'አስተዳዳሪ ፓነል', backToSite: 'ወደ ጣቢያ ተመለስ', recentOrders: 'የቅርብ ጊዜ ትእዛዞች', noOrders: 'እስካሁን ምንም ትእዛዝ የለም'
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
