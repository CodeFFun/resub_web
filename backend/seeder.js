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

const OrderItemSchema = new mongoose.Schema({
    quantity: { type: Number, required: true, min: 1 },
    unit_price: { type: Number, required: true, min: 0 },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
}, { timestamps: true });

const SubscriptionPlanSchema = new mongoose.Schema({
    frequency: { type: Number, required: true, min: 1 },
    price_per_cycle: { type: Number, required: true, min: 0 },
    active: { type: Boolean, default: false },
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] }],
    quantity: { type: Number, min: 1, default: 1 },
}, { timestamps: true });

const SubscriptionSchema = new mongoose.Schema({
    status: { type: String, required: true, default: "active" },
    start_date: { type: Date, required: true },
    remaining_cycle: { type: Number, required: true, min: 1, default: 1 },
    subscription_planId: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
}, { timestamps: true });

const OrderSchema = new mongoose.Schema({
    delivery_type: { type: String, required: true, default: "standard" },
    schedule_for: { type: Date },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    orderItemsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
}, { timestamps: true });

const PaymentSchema = new mongoose.Schema({
    provider: { type: String, default: "esewa" },
    status: { type: String, required: true, default: "completed" },
    amount: { type: Number, required: true, min: 0 },
    paid_at: { type: Date, default: Date.now },
    orderId: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
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
const OrderItem = mongoose.model('OrderItem', OrderItemSchema);
const SubscriptionPlan = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);
const Subscription = mongoose.model('Subscription', SubscriptionSchema);
const Order = mongoose.model('Order', OrderSchema);
const Payment = mongoose.model('Payment', PaymentSchema);

// User IDs
const vendorId1 = new mongoose.Types.ObjectId("69931cadbdb67cec3d290c23"); // Shop owner
const vendorId2 = new mongoose.Types.ObjectId("697dbeb89e90001cff960ed5"); // Shop owner
const customerId = new mongoose.Types.ObjectId("697dfd29477a1cdb684fdcd8"); // Customer

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

// Address data for vendors and customer
const addressesData = [
    // Vendor 1 addresses
    {
        label: "Home",
        line1: "123 Main Street",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7128,
        lng: -74.0060,
        is_default: true,
        userId: vendorId1
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
        userId: vendorId1
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
        userId: vendorId1
    },
    // Vendor 2 addresses
    {
        label: "Home",
        line1: "321 Oak Street",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.0522,
        lng: -118.2437,
        is_default: true,
        userId: vendorId2
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
        userId: vendorId2
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
        userId: vendorId2
    },
    // Customer addresses
    {
        label: "Home",
        line1: "555 Oak Lane",
        city: "Chicago",
        state: "IL",
        country: "USA",
        lat: 41.8781,
        lng: -87.6298,
        is_default: true,
        userId: customerId
    },
    {
        label: "Work",
        line1: "777 Corporate Drive",
        city: "Chicago",
        state: "IL",
        country: "USA",
        lat: 41.8854,
        lng: -87.6182,
        is_default: false,
        userId: customerId
    },
    {
        label: "Apartment",
        line1: "999 Residential Ave",
        city: "Evanston",
        state: "IL",
        country: "USA",
        lat: 42.0451,
        lng: -87.6767,
        is_default: false,
        userId: customerId
    }
];

// Shop names
const shopNames = [
    "Tech Haven",
    "Fashion Forward",
    "Home Essentials",
    "Gourmet Delights",
    "Sports Zone",
    "Beauty Boutique",
    "Electronics Plus",
    "Trendy Wear",
    "Living Space",
    "Artisan Foods"
];

// Product category names
const categoryTemplates = [
    ["Electronics", "Gadgets", "Accessories", "Smart Home", "Audio"],
    ["Men's Clothing", "Women's Clothing", "Kids Wear", "Footwear", "Accessories"],
    ["Furniture", "Decor", "Kitchen", "Bedding", "Storage"],
    ["Snacks", "Beverages", "Organic", "Specialty Foods", "Baking"],
    ["Equipment", "Apparel", "Footwear", "Accessories", "Nutrition"],
    ["Skincare", "Makeup", "Haircare", "Fragrances", "Tools"],
    ["Computing", "Networking", "Peripherals", "Storage", "Monitors"],
    ["Casual Wear", "Formal Wear", "Activewear", "Underwear", "Accessories"],
    ["Outdoor", "Indoor", "Lighting", "Textiles", "Organization"],
    ["Dairy", "Produce", "Spices", "Condiments", "Beverages"]
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
    ],
    // Electronics Plus products
    [
        { name: "External SSD", basePrice: 99.99, description: "1TB portable external SSD" },
        { name: "USB 3.0 Cable", basePrice: 9.99, description: "High-speed USB 3.0 cable" },
        { name: "Monitor Stand", basePrice: 49.99, description: "Adjustable monitor stand riser" },
        { name: "Router", basePrice: 89.99, description: "Dual-band WiFi 6 router" },
        { name: "USB Docking Station", basePrice: 59.99, description: "Multi-port USB docking station" },
        { name: "Memory Card Reader", basePrice: 14.99, description: "Multi-card memory reader" },
        { name: "HDMI Splitter", basePrice: 24.99, description: "4K HDMI 1x2 splitter" },
        { name: "USB Extension Cable", basePrice: 12.99, description: "30ft active USB extension" },
        { name: "Network Cable", basePrice: 8.99, description: "Cat6 ethernet cable 50ft" },
        { name: "Surge Protector", basePrice: 34.99, description: "6-outlet surge protector" },
        { name: "Hard Drive External", basePrice: 79.99, description: "2TB external hard drive" },
        { name: "USB Cable Set", basePrice: 19.99, description: "USB cable variety pack" },
        { name: "Display Cable", basePrice: 16.99, description: "DisplayPort 1.4 cable" },
        { name: "Cooling Pad", basePrice: 44.99, description: "Laptop cooling pad RGB" },
        { name: "Cable Organizer", basePrice: 11.99, description: "Cable management kit" }
    ],
    // Trendy Wear products
    [
        { name: "Blazer", basePrice: 99.99, description: "Professional blazer jacket" },
        { name: "Chinos", basePrice: 54.99, description: "Slim fit chino pants" },
        { name: "Polo Shirt", basePrice: 34.99, description: "Classic polo shirt" },
        { name: "Cargo Pants", basePrice: 64.99, description: "Multi-pocket cargo pants" },
        { name: "Thermal Wear", basePrice: 29.99, description: "Base layer thermal set" },
        { name: "Rain Jacket", basePrice: 84.99, description: "Waterproof breathable jacket" },
        { name: "Winter Boots", basePrice: 119.99, description: "Insulated winter boots" },
        { name: "Sweater", basePrice: 59.99, description: "V-neck wool sweater" },
        { name: "Board Shorts", basePrice: 44.99, description: "Quick-dry board shorts" },
        { name: "Leggings", basePrice: 39.99, description: "Yoga leggings with pockets" },
        { name: "Tank Top", basePrice: 19.99, description: "Breathable tank top" },
        { name: "Cardigan", basePrice: 69.99, description: "Open-front cardigan sweater" },
        { name: "Denim Shorts", basePrice: 44.99, description: "Distressed denim shorts" },
        { name: "Thermal Socks", basePrice: 14.99, description: "Merino wool thermal socks" },
        { name: "Athletic Tights", basePrice: 49.99, description: "Compression athletic tights" }
    ],
    // Living Space products
    [
        { name: "Desk Chair", basePrice: 199.99, description: "Ergonomic office desk chair" },
        { name: "Bookshelf", basePrice: 129.99, description: "5-tier wooden bookshelf" },
        { name: "Nightstand", basePrice: 89.99, description: "Wood nightstand with drawer" },
        { name: "Wall Clock", basePrice: 34.99, description: "Modern minimalist wall clock" },
        { name: "Desk Organizer", basePrice: 24.99, description: "Bamboo desk organizer set" },
        { name: "Floor Lamp", basePrice: 59.99, description: "Arc floor lamp with dimmer" },
        { name: "Wall Shelves", basePrice: 49.99, description: "Floating wall shelf set of 3" },
        { name: "Curtain Rods", basePrice: 39.99, description: "Adjustable curtain rod 48-120in" },
        { name: "Room Divider", basePrice: 79.99, description: "4-panel room divider screen" },
        { name: "Ottoman", basePrice: 69.99, description: "Upholstered storage ottoman" },
        { name: "Picture Frames", basePrice: 19.99, description: "Frame set 5 different sizes" },
        { name: "Desk Pad", basePrice: 29.99, description: "Large leather desk pad" },
        { name: "Throw Blanket", basePrice: 44.99, description: "Chunky knit throw blanket" },
        { name: "Wall Decals", basePrice: 14.99, description: "Removable wall decal set" },
        { name: "Door Mat", basePrice: 22.99, description: "Memory foam door mat" }
    ],
    // Artisan Foods products
    [
        { name: "Maple Syrup", basePrice: 18.99, description: "Pure maple syrup 12oz" },
        { name: "Truffle Oil", basePrice: 24.99, description: "Black truffle infused oil" },
        { name: "Vanilla Beans", basePrice: 16.99, description: "Madagascar vanilla beans" },
        { name: "Saffron", basePrice: 22.99, description: "Pure saffron threads 1g" },
        { name: "Wild Rice", basePrice: 12.99, description: "Organic wild rice 1lb" },
        { name: "Specialty Flour", basePrice: 10.99, description: "Almond flour 2lb bag" },
        { name: "Balsamic Reduction", basePrice: 15.99, description: "Balsamic glaze 8.5oz" },
        { name: "Nut Butter", basePrice: 13.99, description: "Cashew butter 16oz" },
        { name: "Sea Vegetables", basePrice: 11.99, description: "Nori seaweed sheets" },
        { name: "Herbal Tea", basePrice: 9.99, description: "Chamomile herbal tea bags" },
        { name: "Honey Comb", basePrice: 17.99, description: "Raw honeycomb chunks" },
        { name: "Dried Fruits", basePrice: 13.99, description: "Mixed dried fruits 2lb" },
        { name: "Artisan Nuts", basePrice: 19.99, description: "Roasted nuts assortment" },
        { name: "Vinegar Selection", basePrice: 21.99, description: "Artisan vinegar trio" },
        { name: "Gourmet Salt", basePrice: 12.99, description: "Gourmet sea salt collection" }
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
        await Payment.deleteMany({});
        await Order.deleteMany({ userId: customerId });
        await Subscription.deleteMany({ userId: customerId });
        await SubscriptionPlan.deleteMany({});
        await OrderItem.deleteMany({});
        await Address.deleteMany({ userId: { $in: [vendorId1, vendorId2, customerId] } });
        await Shop.deleteMany({ userId: { $in: [vendorId1, vendorId2] } });
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
        
        // Assign shop categories to shops (all 9 categories for 10 shops, cycling through)
        const shopCategoryAssignments = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0]; // Cycling through 9 categories for 10 shops
        
        for (let i = 0; i < 2; i++) {
            const userId = i === 0 ? vendorId1 : vendorId2;
            const userAddresses = addresses.filter(addr => addr.userId.toString() === userId.toString());
            
            for (let j = 0; j < 5; j++) {
                const shop = await Shop.create({
                    name: shopNames[shopIndex],
                    pickup_info: `Pickup available at ${userAddresses[j % userAddresses.length].line1}`,
                    about: `Welcome to ${shopNames[shopIndex]}! We offer quality products with excellent customer service.`,
                    accepts_subscription: true, // All shops accept subscriptions now
                    addressId: userAddresses[j % userAddresses.length]._id.toString(),
                    shop_banner: shopBanners[shopIndex % shopBanners.length],
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

            const assignedCategory = shopCategories.find(cat => cat._id.toString() === shop.categoryId.toString());
            console.log(`  ✅ Shop: ${shop.name} (${assignedCategory?.name || 'Unknown'}) - Created 5 categories and 15 products`);
        }

        console.log(`\n✅ Created ${totalCategories} product categories`);
        console.log(`✅ Created ${totalProducts} products\n`);

        // Create order-items, subscription-plans, subscriptions, orders, and payments
        console.log('🧾 Creating order-items, subscription-plans, subscriptions, orders, and payments...');

        const allProducts = await Product.find({}).select('_id base_price discount shopId').lean();
        let totalOrderItems = 0;
        let totalSubscriptionPlans = 0;
        let totalSubscriptions = 0;
        let totalOrders = 0;
        let totalPayments = 0;

        // FLOW 1: Customer adds product -> create order-item -> create order (with exactly one orderItem) -> create payment
        const directOrderProductCount = Math.min(12, allProducts.length);
        for (let i = 0; i < directOrderProductCount; i++) {
            const product = allProducts[i];
            const quantity = Math.floor(Math.random() * 3) + 1;
            const discountedPrice = Number((product.base_price * (1 - (product.discount || 0) / 100)).toFixed(2));

            const orderItem = await OrderItem.create({
                quantity,
                unit_price: discountedPrice,
                productId: product._id,
            });
            totalOrderItems++;

            const order = await Order.create({
                delivery_type: i % 2 === 0 ? 'standard' : 'express',
                schedule_for: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
                userId: customerId,
                shopId: product.shopId,
                orderItemsId: [orderItem._id], // exactly one orderItem even though field is array
            });
            totalOrders++;

            await Payment.create({
                provider: i % 3 === 0 ? 'khalti' : 'esewa',
                status: 'completed',
                amount: Number((discountedPrice * quantity).toFixed(2)),
                paid_at: new Date(),
                orderId: [order._id],
            });
            totalPayments++;
        }

        // FLOW 2: Customer adds product for subscription-plan -> create subscription -> create order (subscription only) -> create payment
        const subscriptionProducts = allProducts.slice(directOrderProductCount, directOrderProductCount + Math.min(10, allProducts.length - directOrderProductCount));
        for (let i = 0; i < subscriptionProducts.length; i++) {
            const product = subscriptionProducts[i];
            const frequency = [7, 15, 30][i % 3];
            const quantity = Math.floor(Math.random() * 2) + 1;
            const cyclePrice = Number((product.base_price * (1 - (product.discount || 0) / 100)).toFixed(2));

            const subscriptionPlan = await SubscriptionPlan.create({
                frequency,
                price_per_cycle: cyclePrice,
                active: true,
                productId: [product._id],
                quantity,
            });
            totalSubscriptionPlans++;

            const subscription = await Subscription.create({
                status: 'active',
                start_date: new Date(),
                remaining_cycle: frequency,
                subscription_planId: subscriptionPlan._id,
                userId: customerId,
                shopId: product.shopId,
            });
            totalSubscriptions++;

            const order = await Order.create({
                delivery_type: 'subscription',
                schedule_for: new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000),
                subscriptionId: subscription._id,
                userId: customerId,
                shopId: product.shopId,
                // Intentionally no orderItemsId here to keep order as subscription-only
            });
            totalOrders++;

            const payment = await Payment.create({
                provider: 'esewa',
                status: 'completed',
                amount: Number((cyclePrice * quantity).toFixed(2)),
                paid_at: new Date(),
                orderId: [order._id],
            });
            totalPayments++;

            await Subscription.findByIdAndUpdate(subscription._id, { paymentId: payment._id });
        }

        console.log(`✅ Created ${totalOrderItems} order-items`);
        console.log(`✅ Created ${totalSubscriptionPlans} subscription-plans`);
        console.log(`✅ Created ${totalSubscriptions} subscriptions`);
        console.log(`✅ Created ${totalOrders} orders`);
        console.log(`✅ Created ${totalPayments} payments\n`);

        // Summary
        console.log('📊 Seeding Summary:');
        console.log('═══════════════════════════════════════');
        console.log(`🏷️  Total Shop Categories: ${shopCategories.length} (universal)`);
        console.log();
        console.log(`� Shop Owners (Vendors):`);
        console.log();
        console.log(`👤 Vendor 1 (${vendorId1}):`);
        console.log(`   - Addresses: 3`);
        console.log(`   - Shops: 5 (all accept subscriptions)`);
        console.log(`     • ${shopNames[0]} (${shopCategories[0].name})`);
        console.log(`     • ${shopNames[1]} (${shopCategories[1].name})`);
        console.log(`     • ${shopNames[2]} (${shopCategories[2].name})`);
        console.log(`     • ${shopNames[3]} (${shopCategories[3].name})`);
        console.log(`     • ${shopNames[4]} (${shopCategories[4].name})`);
        console.log(`   - Product Categories: 25 (5 per shop)`);
        console.log(`   - Products: 75 (15 per shop)`);
        console.log();
        console.log(`👤 Vendor 2 (${vendorId2}):`);
        console.log(`   - Addresses: 3`);
        console.log(`   - Shops: 5 (all accept subscriptions)`);
        console.log(`     • ${shopNames[5]} (${shopCategories[5].name})`);
        console.log(`     • ${shopNames[6]} (${shopCategories[6].name})`);
        console.log(`     • ${shopNames[7]} (${shopCategories[7].name})`);
        console.log(`     • ${shopNames[8]} (${shopCategories[8].name})`);
        console.log(`     • ${shopNames[9]} (${shopCategories[0].name})`);
        console.log(`   - Product Categories: 25 (5 per shop)`);
        console.log(`   - Products: 75 (15 per shop)`);
        console.log();
        console.log(`👤 Customer (${customerId}):`);
        console.log(`   - Addresses: 3`);
        console.log(`   - Order Items: seeded from product selections`);
        console.log(`   - Subscription Plans: seeded from product selections`);
        console.log(`   - Orders: each order has either one orderItemsId or one subscriptionId`);
        console.log(`   - Payments: created only after order creation`);
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

        const paymentResult = await Payment.deleteMany({});
        console.log(`   ✅ Deleted ${paymentResult.deletedCount} payments`);

        const orderResult = await Order.deleteMany({ userId: customerId });
        console.log(`   ✅ Deleted ${orderResult.deletedCount} orders`);

        const subscriptionResult = await Subscription.deleteMany({ userId: customerId });
        console.log(`   ✅ Deleted ${subscriptionResult.deletedCount} subscriptions`);

        const subscriptionPlanResult = await SubscriptionPlan.deleteMany({});
        console.log(`   ✅ Deleted ${subscriptionPlanResult.deletedCount} subscription plans`);

        const orderItemResult = await OrderItem.deleteMany({});
        console.log(`   ✅ Deleted ${orderItemResult.deletedCount} order items`);
        
        const addressResult = await Address.deleteMany({ userId: { $in: [vendorId1, vendorId2, customerId] } });
        console.log(`   ✅ Deleted ${addressResult.deletedCount} addresses`);
        
        const shopResult = await Shop.deleteMany({ userId: { $in: [vendorId1, vendorId2] } });
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
