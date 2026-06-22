import { MenuItem, ComboOffer, CustomerReview, GalleryItem } from "./types";

export const CATEGORIES = [
  { id: "pizzas", name: "Pizzas", icon: "Pizza", description: "Authentic regular & large stone-baked pizzas" },
  { id: "wraps", name: "Wraps", icon: "FoldHorizontal", description: "Freshly rolled soft tortilla wraps with delicious fillings" },
  { id: "burgers", name: "Burgers", icon: "Egg", description: "Juicy, crispy breast-patty and veg artisan burgers" },
  { id: "sandwiches", name: "Sandwiches", icon: "Columns3", description: "Perfectly grilled sandwiches filled with cheese and spices" },
  { id: "tortillas", name: "Tortillas", icon: "Compass", description: "Chef special stuffed dynamic toasted tortillas" },
  { id: "fried-chicken", name: "Fried Chicken", icon: "Flame", description: "KFC-style ultra-crispy breaded fried chicken, wings, & seafood" },
  { id: "momos", name: "Momos", icon: "CircleDot", description: "Hot steamed premium stuffed momos" },
  { id: "spring-rolls", name: "Spring Rolls", icon: "Wind", description: "Crisp golden wrappers with premium chicken or veggie stuffings" },
  { id: "samosas", name: "Samosas", icon: "Triangle", description: "Classic crispy golden triangles loaded with spiced chicken or veg" },
  { id: "snacks", name: "Snacks & Sides", icon: "Utensils", description: "Aesthetic crisps, loaded fries, twisters, nuggets, and quick bites" },
  { id: "milkshakes", name: "Milkshakes", icon: "CupSoda", description: "Thick luxury blended cold milkshakes topped with goodness" },
  { id: "mojitos", name: "Mojitos", icon: "GlassWater", description: "Sparkling refreshing ice cold mojitos infused with fresh herbs" },
  { id: "ice-creams", name: "Desserts & Ice Creams", icon: "IceCream", description: "Creamy cold scoops, sizzling brownie specials, and delicious treats" },
  { id: "bingo-chat", name: "Bingo Chat", icon: "Sparkles", description: "Spicy and tangy localized street-style crunch bowls" },
];

export const INITIAL_MENU: MenuItem[] = [
  // PIZZAS
  {
    id: "p1",
    name: "Chicken Pizza",
    category: "pizzas",
    subCategory: "Non-Veg Pizzas",
    price: 150,
    variants: [
      { name: "Regular", price: 150 },
      { name: "Large", price: 220 }
    ],
    description: "Premium chunks of dynamic chicken, melted mozzarella, and signature tomato reduction.",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
    popular: true
  },
  {
    id: "p2",
    name: "Butter Chicken Pizza",
    category: "pizzas",
    subCategory: "Non-Veg Pizzas",
    price: 150,
    variants: [
      { name: "Regular", price: 150 },
      { name: "Large", price: 220 }
    ],
    description: "Rich, creamy Delhi-style butter chicken sauce base topped with smoky shredded chicken and mozzarella.",
    imageUrl: "https://images.unsplash.com/photo-1671106681075-5a7233268cbd?w=800&auto=format&fit=crop&q=80",
    popular: true
  },
  {
    id: "p3",
    name: "Spicy Chicken Pizza",
    category: "pizzas",
    subCategory: "Non-Veg Pizzas",
    price: 150,
    variants: [
      { name: "Regular", price: 150 },
      { name: "Large", price: 220 }
    ],
    description: "Fired up with spicy bird's eye chili, marinated hot chicken pieces, and fresh red onions.",
    imageUrl: "https://images.unsplash.com/photo-1618213837799-25d5552820d3?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "p4",
    name: "BBQ Chicken Pizza",
    category: "pizzas",
    subCategory: "Non-Veg Pizzas",
    price: 150,
    variants: [
      { name: "Regular", price: 150 },
      { name: "Large", price: 220 }
    ],
    description: "Tangy sweet BBQ sauce drizzle over slow-roasted tandoori chicken chunks and fresh bell peppers.",
    imageUrl: "https://images.unsplash.com/photo-1601625618639-b989333a9589?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "p5",
    name: "Tandoori Chicken Pizza",
    category: "pizzas",
    subCategory: "Non-Veg Pizzas",
    price: 150,
    variants: [
      { name: "Regular", price: 150 },
      { name: "Large", price: 220 }
    ],
    description: "Spiced Indian clay-oven cooked tandoori chicken, red onions, coriander, and fresh paneer accents.",
    imageUrl: "https://images.unsplash.com/photo-1697107744278-02303cb97031?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "p6",
    name: "Chicken Keema Pizza",
    category: "pizzas",
    subCategory: "Non-Veg Pizzas",
    price: 170,
    variants: [
      { name: "Regular", price: 170 },
      { name: "Large", price: 240 }
    ],
    description: "Minced masala chicken cooked with aromatic spices, fresh mint on a crispy thin woodfire flatbread.",
    imageUrl: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "p7",
    name: "Veg Pizza",
    category: "pizzas",
    subCategory: "Veg Pizzas",
    price: 120,
    variants: [
      { name: "Regular", price: 120 },
      { name: "Large", price: 180 }
    ],
    description: "Garden fresh capsicum, juicy tomatoes, sweet golden corn, and original base cheese.",
    imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "p8",
    name: "Sweet Corn Pizza",
    category: "pizzas",
    subCategory: "Veg Pizzas",
    price: 120,
    variants: [
      { name: "Regular", price: 120 },
      { name: "Large", price: 180 }
    ],
    description: "Loaded with sweet kernels, rich house cheese sauce, and special Indian pizza seasoning.",
    imageUrl: "https://images.unsplash.com/photo-1571066811602-716837d681de?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "p9",
    name: "Mushroom Pizza",
    category: "pizzas",
    subCategory: "Veg Pizzas",
    price: 130,
    variants: [
      { name: "Regular", price: 130 },
      { name: "Large", price: 190 }
    ],
    description: "Earthy sautéed button mushrooms, white garlic sauce, melted cheese blend, and fresh parsley.",
    imageUrl: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "p10",
    name: "Paneer Pizza",
    category: "pizzas",
    subCategory: "Veg Pizzas",
    price: 140,
    variants: [
      { name: "Regular", price: 140 },
      { name: "Large", price: 200 }
    ],
    description: "Crispy marinated cottage cheese cubes, sweet bell peppers, onions, and spicy red pizza sauce.",
    imageUrl: "https://images.unsplash.com/photo-1551881192-002e02ad3d87?w=800&auto=format&fit=crop&q=80",
    popular: true
  },
  {
    id: "p11",
    name: "Onion Capsicum Pizza",
    category: "pizzas",
    subCategory: "Veg Pizzas",
    price: 110,
    variants: [
      { name: "Regular", price: 110 },
      { name: "Large", price: 170 }
    ],
    description: "Crunchy loaded white sliced onion, green capsicum, and premium quality stringy mozzarella.",
    imageUrl: "https://images.unsplash.com/photo-1630980260348-16f484cb6471?w=800&auto=format&fit=crop&q=80"
  },

  // WRAPS
  { id: "w1", name: "Chicken Wrap", category: "wraps", price: 100, description: "Grilled marinated chicken loaded with mint dressing and julienne onions wrapped in a soft shell.", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80" },
  { id: "w2", name: "Spl Chicken Wrap", category: "wraps", price: 120, description: "Loaded with our house-special fried crispy chicken leg chunks, spiced liquid gold cheese, and mayo.", imageUrl: "https://images.unsplash.com/photo-1666819604634-98dd67634148?w=800&auto=format&fit=crop&q=80", popular: true },
  { id: "w3", name: "Veg Wrap", category: "wraps", price: 80, description: "Sautéed exotic vegetables, golden sweet potato patties, crisp lettuce, and dynamic tangy dressing.", imageUrl: "https://images.unsplash.com/photo-1649138783888-0ec9c3ec2f21?w=800&auto=format&fit=crop&q=80" },
  { id: "w4", name: "Mushroom Wrap", category: "wraps", price: 90, description: "Stuffed with garlicky button mushrooms, creamy mayo, fresh cucumber, and light shredded cabbage.", imageUrl: "https://images.unsplash.com/photo-1759139445627-5ce9d5fac8f9?w=800&auto=format&fit=crop&q=80" },
  { id: "w5", name: "Paneer Wrap", category: "wraps", price: 100, description: "Tandoori paneer strips, sliced bell peppers, mint chutney, wrapped in a wholesome toasted base.", imageUrl: "https://images.unsplash.com/photo-1701579231378-3726490a407b?w=800&auto=format&fit=crop&q=80" },

  // BURGERS
  { id: "b1", name: "Veg Burger", category: "burgers", price: 100, description: "Crispy fried golden vegetable patty, sliced red tomatoes, crisp lettuce, and signature yellow mayonnaise.", imageUrl: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=800&auto=format&fit=crop&q=80" },
  { id: "b2", name: "Chicken Burger", category: "burgers", price: 120, description: "Gourmet fried chicken breast fillet loaded with dynamic pepper-garlic relish, gold cheddar, and crisp greens.", imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop&q=80", popular: true },

  // SANDWICHES
  { id: "s1", name: "Chicken Sandwich", category: "sandwiches", price: 110, description: "Juicy pulled shredded chicken breast folded in light white mayo with chopped celery on perfectly grilled white standard bread.", imageUrl: "https://images.unsplash.com/photo-1603903631889-b5f3ba4d5b9b?w=800&auto=format&fit=crop&q=80" },
  { id: "s2", name: "Peri Peri Chicken Sandwich", category: "sandwiches", price: 120, description: "Enveloped in fiery African peri-peri birds eye chili sauce, toasted with hot cheddar melts.", imageUrl: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800&auto=format&fit=crop&q=80" },
  { id: "s3", name: "Tandoori Chicken Sandwich", category: "sandwiches", price: 120, description: "Classic tandoori shredded protein layered inside grilled bread with thick tandoori dynamic mayo.", imageUrl: "https://images.unsplash.com/photo-1745169921154-235bd8c4e6b8?w=800&auto=format&fit=crop&q=80" },
  { id: "s4", name: "Spl Chicken Sandwich", category: "sandwiches", price: 140, description: "Chef's ultimate triple-decker sandwich with double chicken patties, molten cheese pull, and double sauce action.", imageUrl: "https://images.unsplash.com/photo-1665233272941-ae681d11fc06?w=800&auto=format&fit=crop&q=80", popular: true },
  { id: "s5", name: "Veg Sandwich", category: "sandwiches", price: 100, description: "Wholesome potato mint mix, sliced cucumbers, tomatoes, and spicy green herbal house spread.", imageUrl: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=800&auto=format&fit=crop&q=80" },
  { id: "s6", name: "Paneer Sandwich", category: "sandwiches", price: 120, description: "Fresh soft cubed cottage cheese mixed with green bell pepper relish and spiced grilled crusts.", imageUrl: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&auto=format&fit=crop&q=80" },
  { id: "s7", name: "Mushroom Sandwich", category: "sandwiches", price: 100, description: "Garlicky herb sautéed golden brown white mushrooms and stringy melted cheese toastie.", imageUrl: "https://images.unsplash.com/photo-1748020633629-dca427d2d1db?w=800&auto=format&fit=crop&q=80" },

  // TORTILLAS
  { id: "t1", name: "Chicken Tortilla", category: "tortillas", price: 120, description: "Soft wheat tortilla filled with charred chicken pieces, spicy pico and cream cheese.", imageUrl: "https://images.unsplash.com/photo-1639669794539-952631b44515?w=800&auto=format&fit=crop&q=80" },
  { id: "t2", name: "Spl Chicken Tortilla", category: "tortillas", price: 140, description: "Crisp outer quesadilla-style fold loaded with extra double cheese, peri-peri spiced chicken, and fresh baby corn.", imageUrl: "https://images.unsplash.com/photo-1719957770167-bb66133ba808?w=800&auto=format&fit=crop&q=80", popular: true },
  { id: "t3", name: "Veg Tortilla", category: "tortillas", price: 90, description: "Perfect wrap of Mexican black bean spread, roasted peppers, golden sweet corn, and sour cream.", imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&auto=format&fit=crop&q=80" },
  { id: "t4", name: "Mushroom Tortilla", category: "tortillas", price: 100, description: "Sautéed wild button mushroom folded beautifully with hot cheddar and mild hot sauce.", imageUrl: "https://images.unsplash.com/photo-1673925720516-029c757a08e0?w=800&auto=format&fit=crop&q=80" },
  { id: "t5", name: "Paneer Tortilla", category: "tortillas", price: 120, description: "Cajun spiced paneer cubes, crispy iceberg lettuce with sweet and spicy barbecue chipotle.", imageUrl: "https://images.unsplash.com/photo-1606350383072-4b031d6bd834?w=800&auto=format&fit=crop&q=80" },

  // FRIED CHICKEN
  { id: "fc1", name: "Chicken Pop Corn", category: "fried-chicken", price: 120, description: "Bite-sized tender pieces of high-quality white chicken breaded to classic gold crisp perfection.", imageUrl: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=800&auto=format&fit=crop&q=80", popular: true },
  { id: "fc2", name: "Chicken Lollipop (3 pcs)", category: "fried-chicken", price: 120, description: "Traditional pulled chicken lollipop shapes tossed in delicious hot pepper spices and dry marinade.", imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=800&auto=format&fit=crop&q=80" },
  { id: "fc3", name: "Chicken Wings (4 pcs)", category: "fried-chicken", price: 120, description: "Juicy tender interior wings with a crunchy golden, salty-savory KFC styled skin texture.", imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&auto=format&fit=crop&q=80" },
  { id: "fc4", name: "Chicken Strips (5 pcs)", category: "fried-chicken", price: 120, description: "Lean chicken breast tenders cut into strips and triple breaded for extreme crunchiness.", imageUrl: "https://images.unsplash.com/photo-1627662168223-7df99068099a?w=800&auto=format&fit=crop&q=80", popular: true },
  { id: "fc5", name: "Chicken Leg (1 pc)", category: "fried-chicken", price: 80, description: "Single golden chicken drumstick with thick, juicy internal steam-cooked texture.", imageUrl: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=800&auto=format&fit=crop&q=80" },
  { id: "fc6", name: "Crispy Prawns", category: "fried-chicken", price: 160, description: "Premium butterfly prawns, seasoned with secret spices and crumb-coated. Delicately fried.", imageUrl: "https://images.unsplash.com/photo-1750308250192-af7aefcc4459?w=800&auto=format&fit=crop&q=80" },
  { id: "fc7", name: "Fish Strips", category: "fried-chicken", price: 160, description: "Boneless fingers of ocean barramundi, golden-crusted, served with dynamic tartar dip suggestions.", imageUrl: "https://images.unsplash.com/photo-1747905456497-ae13cc928c07?w=800&auto=format&fit=crop&q=80" },

  // MOMOS
  { id: "m1", name: "Chicken Momos (4 pcs)", category: "momos", price: 100, description: "Traditional spiced minced chicken enveloped in delicate wrapper skin. Steamed hot.", imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80", popular: true },
  { id: "m2", name: "Veg Momos (4 pcs)", category: "momos", price: 80, description: "Fresh finely shredded cabbage, wild carrots, sweet greens steamed inside delicious dough pouch.", imageUrl: "https://images.unsplash.com/photo-1589047133531-570405874c6a?w=800&auto=format&fit=crop&q=80" },

  // SPRING ROLLS
  { id: "sr1", name: "Veg Spring Roll (2 pcs)", category: "spring-rolls", price: 80, description: "Crisp delicate roll casing stuffed with translucent spicy Asian vegetable stir-fry.", imageUrl: "https://images.unsplash.com/photo-1560162071-da4c4a91077a?w=800&auto=format&fit=crop&q=80" },
  { id: "sr2", name: "Chicken Spring Roll (2 pcs)", category: "spring-rolls", price: 100, description: "Aromatic shredded chicken breast and fresh spring veggies wrapped and fried till bubble-crisp.", imageUrl: "https://images.unsplash.com/photo-1602375850899-c389c4a0fc70?w=800&auto=format&fit=crop&q=80" },

  // SAMOSAS
  { id: "sa1", name: "Chicken Samosa (5 pcs)", category: "samosas", price: 100, description: "Golden fried homemade triangular pastry loaded with minced spiced chicken masala gravy.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80" },
  { id: "sa2", name: "Veg Samosa (5 pcs)", category: "samosas", price: 100, description: "Salsa-ready triangular shells loaded with traditional royal green peas and mashed coriander potato.", imageUrl: "https://images.unsplash.com/photo-1622715395488-71045e2a4990?w=800&auto=format&fit=crop&q=80" },

  // SNACKS
  { id: "sn1", name: "Potato Twister", category: "snacks", price: 40, description: "Whimsical spiral-sliced potato on a stick, golden seasoned with cheesy tomato dry rub.", imageUrl: "https://images.unsplash.com/photo-1675501344642-92d35d90fe51?w=800&auto=format&fit=crop&q=80" },
  { id: "sn2", name: "French Fries (Salted)", category: "snacks", price: 70, description: "Classic hot-iron uniform potato strips, lightly salted. Crisp-outside, fluffy within.", imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop&q=80" },
  { id: "sn3", name: "French Fries (Peri Peri)", category: "snacks", price: 80, description: "Golden state fries tossed inside high-grade hot African peri-peri sea salt rub.", imageUrl: "https://images.unsplash.com/photo-1607329773021-91a5dbd5986f?w=800&auto=format&fit=crop&q=80" },
  { id: "sn4", name: "Potato Wedges", category: "snacks", price: 90, description: "Thick home-style rustically skins-on potato wedges with gourmet herbed garlic salt.", imageUrl: "https://images.unsplash.com/photo-1610631087218-f784839e48f1?w=800&auto=format&fit=crop&q=80" },
  { id: "sn5", name: "Masala Fries", category: "snacks", price: 100, description: "House loaded signature spiced masala dry sprinkle over steaming crisp select french fries.", imageUrl: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80" },
  { id: "sn6", name: "Veg Nuggets (5 pcs)", category: "snacks", price: 50, description: "Yummy loaded veggie mixture breaded in delicate bite-sized golden drops.", imageUrl: "https://images.unsplash.com/photo-1619881590738-a111d176d906?w=800&auto=format&fit=crop&q=80" },
  { id: "sn7", name: "Chicken Nuggets (6 pcs)", category: "snacks", price: 80, description: "Golden crumbed pure breast-meat premium chicken gems served with dynamic hot dips.", imageUrl: "https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?w=800&auto=format&fit=crop&q=80" },
  { id: "sn8", name: "Smileys (5 pcs)", category: "snacks", price: 50, description: "Beloved happy potato face clouds, crispy and baked golden.", imageUrl: "https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=800&auto=format&fit=crop&q=80" },
  { id: "sn9", name: "Veg Fingers (4 pcs)", category: "snacks", price: 50, description: "Aesthetic crunchy carrot, corn, and green bean sticks coated inside dynamic seasoned breadcrumbs.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Mozzarella_Sticks_at_Mobtown_Ballroom.jpg" },

  // MILKSHAKES
  { id: "ms1", name: "Vanilla Milkshake", category: "milkshakes", price: 90, description: "Melted premium French bean vanilla slow blended with pure cold milk paste.", imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80" },
  { id: "ms2", name: "Strawberry Milkshake", category: "milkshakes", price: 90, description: "Rich deep pink strawberry compote dynamic high flavor shake with whipped visual tops.", imageUrl: "https://images.unsplash.com/photo-1583024012457-b6de05b7003a?w=800&auto=format&fit=crop&q=80" },
  { id: "ms3", name: "Butterscotch Milkshake", category: "milkshakes", price: 100, description: "Rich caramelized crunchy butterscotch chips blended into velvet vanilla custard bases.", imageUrl: "https://images.unsplash.com/photo-1568901839119-631418a3910d?w=800&auto=format&fit=crop&q=80" },
  { id: "ms4", name: "Chocolate Milkshake", category: "milkshakes", price: 100, description: "Sinful Dark Belgian chocolate cocoa and hot fudge ribbon slow-shake stream.", imageUrl: "https://images.unsplash.com/photo-1696487773677-c0c8061fe3d2?w=800&auto=format&fit=crop&q=80", popular: true },
  { id: "ms5", name: "Pista Milkshake", category: "milkshakes", price: 100, description: "Traditional aromatic roasted pistachio crush blended with cold royal malai milk.", imageUrl: "https://images.unsplash.com/photo-1579282769505-39e687bd68c9?w=800&auto=format&fit=crop&q=80" },
  { id: "ms6", name: "Dry Fruit Milkshake", category: "milkshakes", price: 120, description: "Dense premium dry almond, pistachio, cashmere fig, cashew honey absolute health shake.", imageUrl: "https://images.unsplash.com/photo-1595412017587-b7f3117dff54?w=800&auto=format&fit=crop&q=80" },
  { id: "ms7", name: "KitKat Milkshake", category: "milkshakes", price: 100, description: "Crushed flaky milk chocolate KitKat fingers whipped with rich vanilla cream.", imageUrl: "https://images.unsplash.com/photo-1590373927063-cb2d69209a8b?w=800&auto=format&fit=crop&q=80", popular: true },
  { id: "ms8", name: "Oreo Milkshake", category: "milkshakes", price: 100, description: "Rich chocolate cream cookies crushed, whipped and blended into standard gourmet thickness.", imageUrl: "https://images.unsplash.com/photo-1641665271888-575e46923776?w=800&auto=format&fit=crop&q=80" },
  { id: "ms9", name: "Brownie Milkshake", category: "milkshakes", price: 120, description: "Entire warm pan-baked fudge chocolate brownie blended with rich chocolate and vanilla scoops.", imageUrl: "https://images.unsplash.com/photo-1586985289071-36f62f55ce44?w=800&auto=format&fit=crop&q=80", popular: true },

  // MOJITOS
  { id: "mj1", name: "Blue Curacao Mojito", category: "mojitos", price: 80, description: "Sparkling sweet blue curacao syrup, crushed dynamic mint, limes, soda, and premium ice shards.", imageUrl: "https://images.unsplash.com/photo-1682629906883-76eaa5e03693?w=800&auto=format&fit=crop&q=80", popular: true },
  { id: "mj2", name: "Lemon Mint Mojito", category: "mojitos", price: 80, description: "Classic refreshing sour squeeze, golden citrus oils, intense mint leaves, double fizz soda.", imageUrl: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop&q=80" },
  { id: "mj3", name: "Raspberry Mint Mojito", category: "mojitos", price: 80, description: "Sweet crushed red raspberry syrup base beautifully balanced with cooling garden mint.", imageUrl: "https://images.unsplash.com/photo-1664993119473-013502f1e3f8?w=800&auto=format&fit=crop&q=80", popular: true },

  // ICE CREAMS
  { id: "ic1", name: "Vanilla Ice Cream", category: "ice-creams", price: 80, description: "Mouth-cooling simple gourmet vanilla double scoop.", imageUrl: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800&auto=format&fit=crop&q=80" },
  { id: "ic2", name: "Strawberry Ice Cream", category: "ice-creams", price: 80, description: "Aromatic strawberry milk fruit scoop, rich with real berry bits.", imageUrl: "https://images.unsplash.com/photo-1689595929622-c2b6293fe087?w=800&auto=format&fit=crop&q=80" },
  { id: "ic3", name: "Butterscotch Ice Cream", category: "ice-creams", price: 90, description: "Creamy base with delicious crunchy butterscotch sugar pearls.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/DFC_1678_Warm_vanilla_cr%C3%A8me_br%C3%BBl%C3%A9e_with_a_scoop_of_vanilla_ice_cream_diced_caramelized_bananas_and_a_drizzle_of_chocolate_-_a_sweet_trio_on_a_white_platter.jpg" },
  { id: "ic4", name: "Chocolate Ice Cream", category: "ice-creams", price: 90, description: "Cocoa intense dark luxury house ice cream.", imageUrl: "https://images.unsplash.com/photo-1599999182263-ce6c07e98764?w=800&auto=format&fit=crop&q=80" },
  { id: "ic5", name: "Pista Ice Cream", category: "ice-creams", price: 100, description: "Aromatic premium green pista flavored real ice cream scoop.", imageUrl: "https://images.unsplash.com/photo-1614061810671-e6f5ff055104?w=800&auto=format&fit=crop&q=80" },
  { id: "ic6", name: "Dry Fruit Ice Cream", category: "ice-creams", price: 120, description: "Scoop packed with almonds, raisins, dried figs, cashew pieces and premium cream.", imageUrl: "https://images.unsplash.com/photo-1583440772344-edd2e043742c?w=800&auto=format&fit=crop&q=80" },
  { id: "ic7", name: "Mango Ice Cream", category: "ice-creams", price: 90, description: "Summery royal Alphonso mango creamy double scoop.", imageUrl: "https://images.unsplash.com/photo-1591677158211-2c2e78f0bcd9?w=800&auto=format&fit=crop&q=80" },
  { id: "ic8", name: "Triple Flavor Treat", category: "ice-creams", price: 120, description: "Artisan trio layer scoop of gourmet strawberry, chocolate, and rich vanilla.", imageUrl: "https://images.unsplash.com/photo-1627594979732-aa595f5b02b7?w=800&auto=format&fit=crop&q=80" },
  { id: "ic9", name: "Sizzling Brownie Special", category: "ice-creams", price: 150, description: "A hot, fresh, fudgy chocolate brownie topped with cold vanilla bean ice cream and sizzled with rich chocolate fudge sauce.", imageUrl: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&auto=format&fit=crop&q=80", popular: true },

  // BINGO CHAT
  { id: "bc1", name: "Veg Bingo Chat", category: "bingo-chat", price: 60, description: "Crispy tangy Bingo triangle chips tossed with onion, tomatoes, sweet yogurt, spicy mint chutneys, and fine sev.", imageUrl: "https://images.unsplash.com/photo-1580689376629-2c4ef0920e79?w=800&auto=format&fit=crop&q=80" },
  { id: "bc2", name: "Non-Veg Bingo Chat", category: "bingo-chat", price: 80, description: "Crunchy potato triangles loaded with hot shredded butter chicken gravy chunks, dynamic red spices, onion, and mint dressing.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Papri_Chaat.jpg", popular: true }
];

export const INITIAL_COMBOS: ComboOffer[] = [
  {
    id: "c1",
    name: "Veg Combo Large",
    description: "Super-saver family size veg feast. Includes 1x Veg Pizza (6 Piece), French Fries, 1x Veg Sandwich, 1x Veg Burger, 1x Campa Cool Drink, Veg Fingers, and 1x Vennela Milkshake.",
    price: 549,
    originalPrice: 630,
    imageUrl: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=800&auto=format&fit=crop&q=80",
    items: ["Veg Pizza (6 Piece)", "French Fries", "Veg Sandwich", "Veg Burger", "Campa Cool Drink", "Veg Fingers", "Vennela Milkshake"]
  },
  {
    id: "c2",
    name: "Mini Veg Combo",
    description: "Perfect single-serving veggie combo. Comes with 1x Veg Pizza (4 Piece), French Fries, 1x Veg Sandwich, and 1x Campa Cool Drink.",
    price: 280,
    originalPrice: 330,
    imageUrl: "https://images.unsplash.com/photo-1629403061797-2714f344697e?w=800&auto=format&fit=crop&q=80",
    items: ["Veg Pizza (4 Piece)", "French Fries", "Veg Sandwich", "Campa Cool Drink"]
  },
  {
    id: "c3",
    name: "Non Veg Combo Large",
    description: "Ultimate non-veg feast for chicken lovers. Includes 1x Chicken Pizza (6 Piece), French Fries, 1x Sandwich, Chicken Pop Corn, 1x Chicken Burger, and 1x Strawberry Milkshake.",
    price: 649,
    originalPrice: 730,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/A_lunch_platter_of_Assamese_cuisine.jpg",
    items: ["Chicken Pizza (6 Piece)", "French Fries", "Sandwich", "Chicken Pop Corn", "Chicken Burger", "Strawberry Milkshake"]
  },
  {
    id: "c4",
    name: "Mini Non Veg Combo",
    description: "Deluxe mini non-veg combo pack. Features 1x Chicken Pizza (4 Piece), 1x Chicken Sandwich, Chicken Pop Corn, and 1x Campa Cool Drink.",
    price: 349,
    originalPrice: 420,
    imageUrl: "https://images.unsplash.com/photo-1670237735422-5e09f35cc027?w=800&auto=format&fit=crop&q=80",
    items: ["Chicken Pizza (4 Piece)", "Chicken Sandwich", "Chicken Pop Corn", "Campa Cool Drink"]
  },
  {
    id: "c5",
    name: "Fried Chicken Combo",
    description: "Satisfying crispy fried chicken platter. Includes 2x Chicken Lollipops, 2x Chicken Wings, 2x Chicken Strips, 1x Chicken Leg, Pop Corn, and 1x Campa Cool Drink.",
    price: 349,
    originalPrice: 390,
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
    items: ["2 Lollipop", "2 Wings", "2 Strips", "1 Leg", "Pop Corn", "Campa Cool Drink"]
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "r1",
    name: "Arjun Sharma",
    rating: 5,
    comment: "The Butter Chicken Pizza is absolutely mind-blowing! Extremely premium toppings, super soft base, and perfect spices. Delivery in the local area was so quick.",
    date: "2026-06-15"
  },
  {
    id: "r2",
    name: "Priya Nair",
    rating: 5,
    comment: "Excellent value for money. Veg wrap at ₹80 and Chicken Burger at ₹120 are incredibly affordable yet taste like five-star gourmet brands. Saifoodlover Cafe makes my mood happy!",
    date: "2026-06-18"
  },
  {
    id: "r3",
    name: "Mohammed Rafi",
    rating: 4,
    comment: "Great quality fried chicken popcorn and wings. Reminds me exactly of KFC but much fresher and hot. The sizzling brownie with vanilla scoop is a top tier recommendation.",
    date: "2026-06-19"
  },
  {
    id: "r4",
    name: "Ananya Deshmukh",
    rating: 5,
    comment: "Hands down the best cafe in town! Ordering via WhatsApp was super convenient and they customized the sweet corn pizza with extra black pepper as requested. 10/10 level layout!",
    date: "2026-06-19"
  },
  {
    id: "r5",
    name: "Saurav Das",
    rating: 5,
    comment: "Amazing Oreo milkshake and blue curacao mojito. The sweet/mint profile is brilliant. Saifoodlover never misses on good mood and premium vibes.",
    date: "2026-06-20"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Signature Chicken Pizza Fresh From Oven",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
    category: "food"
  },
  {
    id: "g2",
    title: "Premium Caramel Butter Chicken Pizza Base",
    imageUrl: "https://images.unsplash.com/photo-1671106681075-5a7233268cbd?w=800&auto=format&fit=crop&q=80",
    category: "food"
  },
  {
    id: "g3",
    title: "Gourmet Loaded Chicken Burger Stack",
    imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop&q=80",
    category: "food"
  },
  {
    id: "g4",
    title: "Perfectly Fried Popcorn Chicken Crunch",
    imageUrl: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=800&auto=format&fit=crop&q=80",
    category: "food"
  },
  {
    id: "g5",
    title: "Luxury Cafe Ambience - Black & Warm Gold Lighting",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    category: "ambience"
  },
  {
    id: "g6",
    title: "Warm Golden Soft Neon Tables & Leather Booths",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
    category: "ambience"
  },
  {
    id: "g7",
    title: "Group of Customers Sharing Good Vibes & Good Food",
    imageUrl: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&auto=format&fit=crop&q=80",
    category: "experience"
  },
  {
    id: "g8",
    title: "Premium Belgian Chocolate Milkshake Preparation",
    imageUrl: "https://images.unsplash.com/photo-1696487773677-c0c8061fe3d2?w=800&auto=format&fit=crop&q=80",
    category: "food"
  }
];
