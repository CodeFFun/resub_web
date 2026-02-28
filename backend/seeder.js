const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/resub_db";

// Define Schemas
const AddressSchema = new mongoose.Schema({
    label: { type: String, required: true },
    line1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
    is_default: { type: Boolean, default: false },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const ShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pickup_info: { type: String },
    about: { type: String },
    accepts_subscription: { type: Boolean, default: false },
    addressId: { type: String, ref: "Address", required: true },
    shop_banner: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ShopCategory" },
}, { timestamps: true });

const ProductCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    shopId: { type: mongoose.Types.ObjectId, ref: "Shop" },
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    base_price: { type: Number, required: true, min: 0 },
    stock_quantity: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" }],
}, { timestamps: true });

const ShopCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

const Address = mongoose.model('Address', AddressSchema);
const Shop = mongoose.model('Shop', ShopSchema);
const ShopCategory = mongoose.model('ShopCategory', ShopCategorySchema);
const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);
const Product = mongoose.model('Product', ProductSchema);

// User IDs
const userId1 = new mongoose.Types.ObjectId("69931cadbdb67cec3d290c23");
const userId2 = new mongoose.Types.ObjectId("697dbeb89e90001cff960ed5");

// Sample shop banners from uploads folder
const shopBanners = [
    "/uploads/09f18778-6a4a-42cd-a1ca-80858b6aa7af.png",
    "/uploads/155fb0eb-2444-469b-8b13-8c9eff81001b.png",
    "/uploads/2349a112-6f52-4981-b262-c9bc6022c765.png",
    "/uploads/34e24c25-0856-4454-a8bc-869721aecf7c.jpg",
    "/uploads/8ca4abea-b242-4568-8ab3-dbc3ccda53fd.jpg",
    "/uploads/ac672b1e-215e-4cb4-a864-114f9fa7a85d.jpg",
];

// Shop categories (universal)
const shopCategoriesData = [
    { name: "Electronics & Technology", description: "Shops selling electronic devices, gadgets, and tech accessories" },
    { name: "Fashion & Apparel", description: "Clothing, footwear, and fashion accessories stores" },
    { name: "Home & Living", description: "Furniture, home decor, and household essentials" },
    { name: "Food & Beverages", description: "Gourmet foods, snacks, beverages, and specialty ingredients" },
    { name: "Sports & Fitness", description: "Sports equipment, athletic wear, and fitness accessories" },
    { name: "Beauty & Personal Care", description: "Cosmetics, skincare, and personal care products" },
    { name: "Books & Media", description: "Books, magazines, music, and entertainment media" },
    { name: "Toys & Games", description: "Toys, board games, and recreational items" },
    { name: "Automotive", description: "Car accessories, parts, and automotive supplies" }
];

// Address data for each user
const addressesData = [
    // User 1 addresses
    {
        label: "Home",
        line1: "123 Main Street",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7128,
        lng: -74.0060,
        is_default: true,
        userId: userId1
    },
    {
        label: "Office",
        line1: "456 Business Ave, Suite 200",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7589,
        lng: -73.9851,
        is_default: false,
        userId: userId1
    },
    {
        label: "Warehouse",
        line1: "789 Industrial Pkwy",
        city: "Brooklyn",
        state: "NY",
        country: "USA",
        lat: 40.6782,
        lng: -73.9442,
        is_default: false,
        userId: userId1
    },
    // User 2 addresses
    {
        label: "Home",
        line1: "321 Oak Street",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.0522,
        lng: -118.2437,
        is_default: true,
        userId: userId2
    },
    {
        label: "Store Location",
        line1: "654 Commerce Blvd",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.0407,
        lng: -118.2468,
        is_default: false,
        userId: userId2
    },
    {
        label: "Distribution Center",
        line1: "987 Logistics Way",
        city: "Long Beach",
        state: "CA",
        country: "USA",
        lat: 33.7701,
        lng: -118.1937,
        is_default: false,
        userId: userId2
    }
];

// Shop names
const shopNames = [
    "Tech Haven",
    "Fashion Forward",
    "Home Essentials",
    "Gourmet Delights",
    "Sports Zone",
    "Beauty Boutique"
];

// Product category names
const categoryTemplates = [
    ["Electronics", "Gadgets", "Accessories", "Smart Home", "Audio"],
    ["Men's Clothing", "Women's Clothing", "Kids Wear", "Footwear", "Accessories"],
    ["Furniture", "Decor", "Kitchen", "Bedding", "Storage"],
    ["Snacks", "Beverages", "Organic", "Specialty Foods", "Baking"],
    ["Equipment", "Apparel", "Footwear", "Accessories", "Nutrition"],
    ["Skincare", "Makeup", "Haircare", "Fragrances", "Tools"]
];

// Product templates
const productTemplates = [
    // Tech Haven products
    [
        { name: "Wireless Mouse", basePrice: 29.99, description: "Ergonomic wireless mouse with precision tracking" },
        { name: "USB-C Cable", basePrice: 12.99, description: "High-speed charging cable 6ft" },
        { name: "Phone Stand", basePrice: 19.99, description: "Adjustable aluminum phone stand" },
        { name: "Bluetooth Speaker", basePrice: 49.99, description: "Portable waterproof Bluetooth speaker" },
        { name: "Screen Protector", basePrice: 9.99, description: "Tempered glass screen protector" },
        { name: "Smart LED Bulb", basePrice: 24.99, description: "WiFi-enabled color changing bulb" },
        { name: "Wireless Charger", basePrice: 34.99, description: "Fast wireless charging pad" },
        { name: "Keyboard", basePrice: 69.99, description: "Mechanical RGB gaming keyboard" },
        { name: "Webcam HD", basePrice: 79.99, description: "1080p HD webcam with microphone" },
        { name: "Power Bank", basePrice: 39.99, description: "20000mAh portable charger" },
        { name: "Earbuds", basePrice: 89.99, description: "True wireless earbuds with noise cancellation" },
        { name: "Laptop Stand", basePrice: 44.99, description: "Adjustable aluminum laptop stand" },
        { name: "HDMI Cable", basePrice: 14.99, description: "4K HDMI cable 10ft" },
        { name: "Gaming Mouse Pad", basePrice: 24.99, description: "Extended RGB gaming mouse pad" },
        { name: "USB Hub", basePrice: 29.99, description: "7-port USB 3.0 hub" }
    ],
    // Fashion Forward products
    [
        { name: "Cotton T-Shirt", basePrice: 24.99, description: "Premium cotton crew neck t-shirt" },
        { name: "Denim Jeans", basePrice: 59.99, description: "Classic fit denim jeans" },
        { name: "Leather Jacket", basePrice: 149.99, description: "Genuine leather motorcycle jacket" },
        { name: "Summer Dress", basePrice: 79.99, description: "Floral print summer dress" },
        { name: "Running Shoes", basePrice: 89.99, description: "Lightweight running shoes" },
        { name: "Backpack", basePrice: 49.99, description: "Water-resistant travel backpack" },
        { name: "Wristwatch", basePrice: 199.99, description: "Stainless steel analog watch" },
        { name: "Sunglasses", basePrice: 39.99, description: "UV protection polarized sunglasses" },
        { name: "Hoodie", basePrice: 54.99, description: "Pullover fleece hoodie" },
        { name: "Sneakers", basePrice: 74.99, description: "Classic white sneakers" },
        { name: "Belt", basePrice: 29.99, description: "Genuine leather belt" },
        { name: "Wallet", basePrice: 34.99, description: "RFID blocking leather wallet" },
        { name: "Scarf", basePrice: 19.99, description: "Wool blend winter scarf" },
        { name: "Baseball Cap", basePrice: 24.99, description: "Adjustable cotton cap" },
        { name: "Socks Pack", basePrice: 14.99, description: "6-pack athletic socks" }
    ],
    // Home Essentials products
    [
        { name: "Bed Sheets Set", basePrice: 49.99, description: "Premium microfiber bed sheet set" },
        { name: "Throw Pillows", basePrice: 29.99, description: "Decorative throw pillow pair" },
        { name: "Coffee Table", basePrice: 149.99, description: "Modern wood coffee table" },
        { name: "Table Lamp", basePrice: 39.99, description: "Modern minimalist table lamp" },
        { name: "Area Rug", basePrice: 89.99, description: "Soft shag area rug 5x7" },
        { name: "Storage Bins", basePrice: 24.99, description: "Collapsible storage bins set of 3" },
        { name: "Wall Art", basePrice: 59.99, description: "Framed canvas wall art" },
        { name: "Curtains", basePrice: 44.99, description: "Blackout thermal curtains" },
        { name: "Knife Set", basePrice: 79.99, description: "15-piece kitchen knife set" },
        { name: "Cookware Set", basePrice: 129.99, description: "Non-stick cookware 10-piece set" },
        { name: "Comforter Set", basePrice: 99.99, description: "All-season comforter with shams" },
        { name: "Bath Towels", basePrice: 34.99, description: "Turkish cotton bath towel set" },
        { name: "Trash Can", basePrice: 29.99, description: "Stainless steel step trash can" },
        { name: "Laundry Basket", basePrice: 19.99, description: "Collapsible laundry hamper" },
        { name: "Mirror", basePrice: 64.99, description: "Large wall-mounted mirror" }
    ],
    // Gourmet Delights products
    [
        { name: "Organic Coffee Beans", basePrice: 16.99, description: "Single-origin arabica coffee beans 1lb" },
        { name: "Artisan Chocolate", basePrice: 12.99, description: "Handcrafted dark chocolate bar" },
        { name: "Olive Oil", basePrice: 19.99, description: "Extra virgin olive oil 500ml" },
        { name: "Honey", basePrice: 14.99, description: "Raw organic honey 16oz" },
        { name: "Pasta Set", basePrice: 24.99, description: "Italian pasta variety pack" },
        { name: "Spice Collection", basePrice: 29.99, description: "Gourmet spice set 12 bottles" },
        { name: "Green Tea", basePrice: 9.99, description: "Premium loose leaf green tea" },
        { name: "Trail Mix", basePrice: 8.99, description: "Organic trail mix 12oz" },
        { name: "Protein Bars", basePrice: 19.99, description: "Plant-based protein bars 12 pack" },
        { name: "Almond Butter", basePrice: 11.99, description: "Organic almond butter 16oz" },
        { name: "Quinoa", basePrice: 13.99, description: "Organic quinoa 2lb bag" },
        { name: "Sea Salt", basePrice: 7.99, description: "Himalayan pink sea salt" },
        { name: "Balsamic Vinegar", basePrice: 16.99, description: "Aged balsamic vinegar" },
        { name: "Granola", basePrice: 10.99, description: "Organic granola cereal" },
        { name: "Dark Roast Coffee", basePrice: 14.99, description: "Dark roast ground coffee" }
    ],
    // Sports Zone products
    [
        { name: "Yoga Mat", basePrice: 29.99, description: "Non-slip exercise yoga mat" },
        { name: "Dumbbells Set", basePrice: 79.99, description: "Adjustable dumbbell set 50lb" },
        { name: "Resistance Bands", basePrice: 19.99, description: "Resistance bands set of 5" },
        { name: "Jump Rope", basePrice: 12.99, description: "Speed jump rope with counter" },
        { name: "Water Bottle", basePrice: 24.99, description: "Insulated stainless steel 32oz" },
        { name: "Gym Bag", basePrice: 44.99, description: "Duffel gym bag with shoe compartment" },
        { name: "Running Shorts", basePrice: 29.99, description: "Lightweight performance shorts" },
        { name: "Sports Bra", basePrice: 34.99, description: "High impact sports bra" },
        { name: "Foam Roller", basePrice: 24.99, description: "High density foam roller" },
        { name: "Workout Gloves", basePrice: 19.99, description: "Padded weight lifting gloves" },
        { name: "Protein Shaker", basePrice: 14.99, description: "Leak-proof protein shaker bottle" },
        { name: "Fitness Tracker", basePrice: 99.99, description: "Smart fitness tracker watch" },
        { name: "Compression Socks", basePrice: 22.99, description: "Athletic compression socks" },
        { name: "Knee Sleeves", basePrice: 29.99, description: "Compression knee support sleeves" },
        { name: "Tennis Racket", basePrice: 89.99, description: "Professional tennis racket" }
    ],
    // Beauty Boutique products
    [
        { name: "Facial Cleanser", basePrice: 18.99, description: "Gentle foaming facial cleanser" },
        { name: "Moisturizer", basePrice: 32.99, description: "Hydrating daily moisturizer SPF 30" },
        { name: "Serum", basePrice: 44.99, description: "Vitamin C brightening serum" },
        { name: "Face Mask Set", basePrice: 24.99, description: "Sheet mask variety pack 10 pieces" },
        { name: "Lipstick", basePrice: 19.99, description: "Long-lasting matte lipstick" },
        { name: "Mascara", basePrice: 16.99, description: "Volumizing mascara waterproof" },
        { name: "Foundation", basePrice: 36.99, description: "Full coverage liquid foundation" },
        { name: "Eyeshadow Palette", basePrice: 42.99, description: "Neutral eyeshadow palette 16 colors" },
        { name: "Nail Polish Set", basePrice: 29.99, description: "Gel nail polish set 6 colors" },
        { name: "Hair Dryer", basePrice: 79.99, description: "Ionic hair dryer 1800W" },
        { name: "Flat Iron", basePrice: 69.99, description: "Ceramic straightening flat iron" },
        { name: "Shampoo", basePrice: 22.99, description: "Sulfate-free moisturizing shampoo" },
        { name: "Conditioner", basePrice: 22.99, description: "Repairing hair conditioner" },
        { name: "Perfume", basePrice: 64.99, description: "Floral eau de parfum 50ml" },
        { name: "Makeup Brushes", basePrice: 39.99, description: "Professional makeup brush set 12pc" }
    ]
];

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Address.deleteMany({ userId: { $in: [userId1, userId2] } });
        await Shop.deleteMany({ userId: { $in: [userId1, userId2] } });
        await ShopCategory.deleteMany({});
        await ProductCategory.deleteMany({});
        await Product.deleteMany({});
        console.log('✅ Existing data cleared\n');

        // Create shop categories (universal)
        console.log('🏷️  Creating shop categories...');
        const shopCategories = await ShopCategory.insertMany(shopCategoriesData);
        console.log(`✅ Created ${shopCategories.length} shop categories\n`);

        // Create addresses
        console.log('📍 Creating addresses...');
        const addresses = await Address.insertMany(addressesData);
        console.log(`✅ Created ${addresses.length} addresses\n`);

        // Create shops
        console.log('🏪 Creating shops...');
        const shops = [];
        let shopIndex = 0;
        
        // Assign shop categories to shops (first 6 categories for 6 shops)
        const shopCategoryAssignments = [0, 1, 2, 3, 4, 5]; // Indices for the 6 shops
        
        for (let i = 0; i < 2; i++) {
            const userId = i === 0 ? userId1 : userId2;
            const userAddresses = addresses.filter(addr => addr.userId.toString() === userId.toString());
            
            for (let j = 0; j < 3; j++) {
                const shop = await Shop.create({
                    name: shopNames[shopIndex],
                    pickup_info: `Pickup available at ${userAddresses[j].line1}`,
                    about: `Welcome to ${shopNames[shopIndex]}! We offer quality products with excellent customer service.`,
                    accepts_subscription: j === 0, // First shop of each user accepts subscriptions
                    addressId: userAddresses[j]._id.toString(),
                    shop_banner: shopBanners[shopIndex],
                    userId: userId,
                    categoryId: shopCategories[shopCategoryAssignments[shopIndex]]._id
                });
                shops.push(shop);
                shopIndex++;
            }
        }
        console.log(`✅ Created ${shops.length} shops\n`);

        // Create product categories and products
        console.log('📦 Creating product categories and products...');
        let totalCategories = 0;
        let totalProducts = 0;

        for (let i = 0; i < shops.length; i++) {
            const shop = shops[i];
            const categories = [];

            // Create 5 categories per shop
            for (let j = 0; j < 5; j++) {
                const category = await ProductCategory.create({
                    name: categoryTemplates[i][j],
                    description: `${categoryTemplates[i][j]} for ${shop.name}`,
                    shopId: shop._id
                });
                categories.push(category);
                totalCategories++;
            }

            // Create 15 products per shop
            for (let k = 0; k < 15; k++) {
                const productTemplate = productTemplates[i][k];
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                const additionalCategory = categories[Math.floor(Math.random() * categories.length)];
                
                await Product.create({
                    name: productTemplate.name,
                    description: productTemplate.description,
                    base_price: productTemplate.basePrice,
                    stock_quantity: Math.floor(Math.random() * 100) + 20, // 20-120 items
                    discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) : 0, // 0-30% discount randomly
                    shopId: shop._id,
                    categoryId: [randomCategory._id, additionalCategory._id]
                });
                totalProducts++;
            }

            console.log(`  ✅ Shop: ${shop.name} (${shopCategories[i].name}) - Created 5 categories and 15 products`);
        }

        console.log(`\n✅ Created ${totalCategories} product categories`);
        console.log(`✅ Created ${totalProducts} products\n`);

        // Summary
        console.log('📊 Seeding Summary:');
        console.log('═══════════════════════════════════════');
        console.log(`🏷️  Total Shop Categories: ${shopCategories.length} (universal)`);
        console.log();
        console.log(`👤 User 1 (${userId1}):`);
        console.log(`   - Addresses: 3`);
        console.log(`   - Shops: 3`);
        console.log(`     • ${shopNames[0]} (${shopCategories[0].name})`);
        console.log(`     • ${shopNames[1]} (${shopCategories[1].name})`);
        console.log(`     • ${shopNames[2]} (${shopCategories[2].name})`);
        console.log(`   - Product Categories: 15 (5 per shop)`);
        console.log(`   - Products: 45 (15 per shop)`);
        console.log();
        console.log(`👤 User 2 (${userId2}):`);
        console.log(`   - Addresses: 3`);
        console.log(`   - Shops: 3`);
        console.log(`     • ${shopNames[3]} (${shopCategories[3].name})`);
        console.log(`     • ${shopNames[4]} (${shopCategories[4].name})`);
        console.log(`     • ${shopNames[5]} (${shopCategories[5].name})`);
        console.log(`   - Product Categories: 15 (5 per shop)`);
        console.log(`   - Products: 45 (15 per shop)`);
        console.log('═══════════════════════════════════════');
        console.log(`\n🎉 Database seeding completed successfully!`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
    }
}

async function deleteSeededData() {
    try {
        console.log('🗑️  Starting data deletion...\n');

        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Delete all seeded data
        console.log('🗑️  Deleting seeded data...');
        
        const addressResult = await Address.deleteMany({ userId: { $in: [userId1, userId2] } });
        console.log(`   ✅ Deleted ${addressResult.deletedCount} addresses`);
        
        const shopResult = await Shop.deleteMany({ userId: { $in: [userId1, userId2] } });
        console.log(`   ✅ Deleted ${shopResult.deletedCount} shops`);
        
        const shopCategoryResult = await ShopCategory.deleteMany({});
        console.log(`   ✅ Deleted ${shopCategoryResult.deletedCount} shop categories`);
        
        const productCategoryResult = await ProductCategory.deleteMany({});
        console.log(`   ✅ Deleted ${productCategoryResult.deletedCount} product categories`);
        
        const productResult = await Product.deleteMany({});
        console.log(`   ✅ Deleted ${productResult.deletedCount} products`);

        console.log('\n🎉 All seeded data deleted successfully!');

    } catch (error) {
        console.error('❌ Error deleting data:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
    }
}

// Check command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (command === 'delete') {
    deleteSeededData();
} else if (command === 'seed') {
    seedDatabase();
} else {
    console.log('Usage:');
    console.log('  node seeder.js seed   - Seed the database with sample data');
    console.log('  node seeder.js delete - Delete all seeded data');
    console.log('\nDefaulting to seed operation...\n');
    seedDatabase();
}
