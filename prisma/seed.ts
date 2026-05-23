import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.review.deleteMany();
  await prisma.roomBooking.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.tableBooking.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.experienceBooking.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.spaBooking.deleteMany();
  await prisma.spaTreatment.deleteMany();
  await prisma.event.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.contactForm.deleteMany();

  console.log('Seeding G7 Hotels premium database...');

  // 1. Rooms
  console.log('Seeding Rooms...');
  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        name: 'Deluxe Garden Sanctuary',
        type: 'DELUXE',
        view: 'GARDEN',
        description: 'Overlooking our pristine, landscaped courtyards, the Deluxe Garden Sanctuary merges contemporary elegance with nature. Featuring handcrafted teakwood furnishings, a private balcony, and state-of-the-art automation for climate and lighting.',
        shortDescription: 'Charming pool and garden views with a private sit-out balcony.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
        ]),
        basePrice: 12000,
        currency: 'INR',
        size: 450,
        maxOccupancy: 3,
        maxAdults: 2,
        maxChildren: 1,
        beds: JSON.stringify([{ type: 'King', count: 1 }]),
        amenities: JSON.stringify(['Free Wi-Fi', 'Room Service', 'Air Conditioning', 'Smart TV', 'Coffee Maker', 'Safe', 'Mini Bar', 'Balcony']),
        smokingAllowed: false,
        petFriendly: false,
        accessible: true,
        totalRooms: 15,
        rating: 4.8,
        reviewCount: 34,
        featured: true,
        sortOrder: 1,
      }
    }),
    prisma.room.create({
      data: {
        name: 'Executive Poolside Vista',
        type: 'DELUXE',
        view: 'POOL',
        description: 'Wake up to the serene sights of our azure infinity pool. Designed with high ceilings, soft ivory marble flooring, and walk-in rain showers, this suite offers immediate access to the wellness club and gardens.',
        shortDescription: 'Serene poolside terrace room with luxury marble bath.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
        ]),
        basePrice: 16500,
        currency: 'INR',
        size: 520,
        maxOccupancy: 3,
        maxAdults: 2,
        maxChildren: 1,
        beds: JSON.stringify([{ type: 'King', count: 1 }]),
        amenities: JSON.stringify(['Free Wi-Fi', 'Room Service', 'Air Conditioning', 'Smart TV', 'Coffee Maker', 'Safe', 'Mini Bar', 'Bathtub']),
        smokingAllowed: false,
        petFriendly: false,
        accessible: false,
        totalRooms: 12,
        rating: 4.9,
        reviewCount: 42,
        featured: true,
        sortOrder: 2,
      }
    }),
    prisma.room.create({
      data: {
        name: 'Signature Panoramic Suite',
        type: 'SUITE',
        view: 'MOUNTAIN',
        description: 'Perfectly framed views of the Srikalahasti mountain ridges await you. The Signature Panoramic Suite boasts a distinct master bedroom, a lavish living lounge, a dining area, and a deep soaking bathtub positioned to overlook the mist-kissed hills.',
        shortDescription: 'Ultra-luxurious dual-room suite with sweeping mountain panoramas.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
        ]),
        basePrice: 28000,
        currency: 'INR',
        size: 850,
        maxOccupancy: 4,
        maxAdults: 3,
        maxChildren: 2,
        beds: JSON.stringify([{ type: 'King', count: 1 }, { type: 'Sofa Bed', count: 1 }]),
        amenities: JSON.stringify(['Free Wi-Fi', 'Room Service', 'Air Conditioning', 'Smart TV', 'Coffee Maker', 'Safe', 'Mini Bar', 'Bathtub', 'Balcony', 'Work Desk']),
        smokingAllowed: false,
        petFriendly: true,
        accessible: true,
        totalRooms: 8,
        rating: 4.95,
        reviewCount: 29,
        featured: true,
        sortOrder: 3,
      }
    }),
    prisma.room.create({
      data: {
        name: 'The G7 Royal Residence',
        type: 'ROYAL',
        view: 'GARDEN',
        description: 'Fit for royalty, this expansive residence represents the pinnacle of hospitality. Complete with a private infinity plunge pool, a private library, a 24/7 dedicated butler service, and exquisite local Srikalahasti Kalamkari wall tapestries.',
        shortDescription: 'Ultimate grandeur featuring private plunge pool and 24/7 butler service.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
        ]),
        basePrice: 75000,
        currency: 'INR',
        size: 1500,
        maxOccupancy: 5,
        maxAdults: 4,
        maxChildren: 2,
        beds: JSON.stringify([{ type: 'King', count: 2 }]),
        amenities: JSON.stringify(['Free Wi-Fi', 'Room Service', 'Air Conditioning', 'Smart TV', 'Coffee Maker', 'Safe', 'Mini Bar', 'Bathtub', 'Balcony', 'Work Desk', 'Kitchenette']),
        smokingAllowed: false,
        petFriendly: true,
        accessible: true,
        totalRooms: 2,
        rating: 5.0,
        reviewCount: 16,
        featured: true,
        sortOrder: 4,
      }
    })
  ]);

  // 2. Restaurants
  console.log('Seeding Restaurants...');
  const goldenLeaf = await prisma.restaurant.create({
    data: {
      name: 'The Golden Leaf',
      description: 'G7 Hotels\' signature fine dining venue presenting ancient Indian royal recipes infused with modern culinary techniques. Enjoy an ambient, candle-lit setting beneath breathtaking crystal chandeliers.',
      shortDescription: 'Exquisite Indian fine dining with a contemporary twist.',
      cuisine: JSON.stringify(['Indian', 'Mughlai', 'Fusion']),
      mealTypes: JSON.stringify(['Lunch', 'Dinner']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80'
      ]),
      capacity: 80,
      openingHours: JSON.stringify({ weekdays: '12:30 PM - 11:00 PM', weekends: '12:00 PM - 11:30 PM' }),
      dressCode: 'Formal / Elegant Casual',
      priceRange: 'FOUR',
      features: JSON.stringify(['Private Dining Rooms', 'Live Sitar Music', 'Sommelier']),
      dietaryOptions: JSON.stringify(['Vegetarian', 'Vegan', 'Gluten-Free']),
      chefName: 'Chef Raghavan Pillai',
      chefTitle: 'Executive Culinary Director',
      chefBio: 'With three decades of experience at Michelin-starred venues globally, Chef Raghavan curates our menus using rare heirloom spices sourced directly from local organic farmers.',
      chefImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
      featured: true,
      sortOrder: 1,
    }
  });

  const lotusCafe = await prisma.restaurant.create({
    data: {
      name: 'Lotus All-Day Cafe',
      description: 'A bright, welcoming farm-to-table cafe open 24 hours. Serving global cuisines, premium artisanal coffee, and traditional South Indian breakfasts prepared with a signature luxury touch.',
      shortDescription: 'Vibrant 24/7 dining with a premium global menu.',
      cuisine: JSON.stringify(['Continental', 'South Indian', 'Italian', 'Asian']),
      mealTypes: JSON.stringify(['Breakfast', 'Lunch', 'Dinner', 'Late Night']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80'
      ]),
      capacity: 120,
      openingHours: JSON.stringify({ weekdays: 'Open 24/7', weekends: 'Open 24/7' }),
      dressCode: 'Smart Casual',
      priceRange: 'TWO',
      features: JSON.stringify(['Buffet', 'Outdoor Seating', 'Live Counter']),
      dietaryOptions: JSON.stringify(['Vegetarian', 'Vegan', 'Halal', 'Keto']),
      chefName: 'Chef Arjun Prasad',
      chefTitle: 'Chef de Cuisine',
      chefBio: 'Chef Arjun specializes in organic baking and healthy wellness cuisine, bringing a crisp and refreshing balance to our all-day menu.',
      chefImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
      featured: true,
      sortOrder: 2,
    }
  });

  // 3. Menu Items
  console.log('Seeding Menu Items...');
  await prisma.menuItem.createMany({
    data: [
      {
        restaurantId: goldenLeaf.id,
        name: 'Rayalaseema Royal Lamb Chops',
        description: 'Tender premium lamb rack marinated in a fiery blend of stone-ground local Guntur chilies, Srikalahasti spices, and slow-roasted in a traditional clay tandoor.',
        price: 1850,
        category: 'Main Course',
        dietary: JSON.stringify(['Gluten-Free']),
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        featured: true,
        available: true,
      },
      {
        restaurantId: goldenLeaf.id,
        name: 'Avocado Shahi Galouti',
        description: 'A delicate vegetarian melt-in-the-mouth kebab made of mashed avocado, green peas, smoked cashew paste, and infusing 25 secret royal spices.',
        price: 950,
        category: 'Appetizer',
        dietary: JSON.stringify(['Vegetarian']),
        image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
        featured: true,
        available: true,
      },
      {
        restaurantId: lotusCafe.id,
        name: 'G7 Organic Ghee Podi Dosa',
        description: 'Crispy fermented rice crepe dusted with an artisan gun-powder (podi) spice blend, absolute organic A2 cow ghee, served with three signature coconut chutneys.',
        price: 450,
        category: 'Breakfast',
        dietary: JSON.stringify(['Vegetarian', 'Gluten-Free']),
        image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
        featured: true,
        available: true,
      }
    ]
  });

  // 4. Experiences
  console.log('Seeding Experiences...');
  await prisma.experience.createMany({
    data: [
      {
        name: 'Kalahasti Kalamkari Art Exploration',
        description: 'Immerse yourself in Srikalahasti\'s legendary heritage. Guided by a national award-winning Kalamkari master, you will learn the meticulous process of hand-painting with natural vegetable dyes and draw your own sacred tapestry to take home.',
        shortDescription: 'Private hands-on masterclass in traditional Kalamkari art.',
        category: 'CULTURAL',
        difficulty: 'EASY',
        duration: '4 Hours',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80'
        ]),
        price: 4000,
        currency: 'INR',
        priceIncludes: JSON.stringify(['Art Supplies', 'Gourmet Lunch', 'Private Studio Tour', 'Take-Home Canvas']),
        priceExcludes: JSON.stringify(['Hotel Transfers (Available as add-on)']),
        maxGroupSize: 6,
        minAge: 8,
        location: 'Heritage Studio, Srikalahasti',
        meetingPoint: 'Hotel Lobby concierge desk',
        inclusions: JSON.stringify(['English/Telugu speaking expert guide', 'All materials', 'Fine dining lunch box']),
        exclusions: JSON.stringify(['Gratuities']),
        cancellationPolicy: 'Cancel up to 24 hours in advance for a full refund.',
        featured: true,
        rating: 4.9,
        reviewCount: 18,
        sortOrder: 1,
      },
      {
        name: 'Merlapaka Hills Trek & Sunset Meditation',
        description: 'Embark on a private guided trekking expedition through the pristine Merlapaka hills. Discover hidden forest trails, learn about indigenous flora, and participate in a guided zen meditation session at the summit right as the sun sets over the valley.',
        shortDescription: 'Scenic private trek with a hilltop sunset meditation.',
        category: 'ADVENTURE',
        difficulty: 'MODERATE',
        duration: '5 Hours',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80'
        ]),
        price: 3200,
        currency: 'INR',
        priceIncludes: JSON.stringify(['Private Guide', 'Hydration Pack', 'Organic Energy Bars', 'Meditation Mats']),
        priceExcludes: JSON.stringify(['Trekking shoes']),
        maxGroupSize: 8,
        minAge: 12,
        location: 'Merlapaka Forest Reserve',
        meetingPoint: 'Activity desk near the lobby',
        inclusions: JSON.stringify(['Trained naturalist guide', 'First-aid setup', 'High-quality yoga mats']),
        exclusions: JSON.stringify(['Personal insurance']),
        cancellationPolicy: 'Refundable if cancelled at least 48 hours prior.',
        featured: true,
        rating: 4.95,
        reviewCount: 22,
        sortOrder: 2,
      }
    ]
  });

  // 5. Spa Treatments
  console.log('Seeding Spa Treatments...');
  await prisma.spaTreatment.createMany({
    data: [
      {
        name: 'Royal Shirodhara Ayurvedic Ritual',
        description: 'An ancient, profoundly soothing Ayurvedic therapy where a continuous, warm stream of custom-blended herbal oils is poured gently onto the forehead. Calms the nervous system, alleviates anxiety, and deeply restores sleep patterns.',
        shortDescription: 'Warm, meditative oil therapy for complete mental relaxation.',
        category: 'AYURVEDA',
        duration: 75,
        price: 6500,
        currency: 'INR',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
        ]),
        benefits: JSON.stringify(['Calms anxiety', 'Relieves insomnia', 'Nourishes scalp and hair', 'Restores neurological balance']),
        contraindications: JSON.stringify(['First trimester of pregnancy', 'Acute fever', 'Scalp lesions']),
        therapistGender: 'ANY',
        featured: true,
        sortOrder: 1,
      },
      {
        name: 'Sandalwood & Saffron Radiant Facial',
        description: 'Restore your natural glow with our signature facial using hand-ground Mysore Sandalwood paste, pure Kashmiri saffron extracts, and steam massage. Ideal for deep hydration and reviving tired skin.',
        shortDescription: 'Luxury hydration and brightening with pure local sandalwood.',
        category: 'FACIAL',
        duration: 60,
        price: 5200,
        currency: 'INR',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80'
        ]),
        benefits: JSON.stringify(['Brightens complexion', 'Intense hydration', 'Reduces puffiness', 'Promotes collagen regeneration']),
        therapistGender: 'FEMALE',
        featured: true,
        sortOrder: 2,
      }
    ]
  });

  // 6. Venues
  console.log('Seeding Venues...');
  await prisma.venue.create({
    data: {
      name: 'The Royal Grand Ballroom',
      description: 'An architectural marvel of elegance, the ballroom features grand Corinthian columns, towering ceilings, state-of-the-art acoustics, and customizable ambient lighting. Perfect for high-profile weddings, gala dinners, and key conventions.',
      type: JSON.stringify(['WEDDING', 'CORPORATE', 'CONFERENCE']),
      capacityTheater: 500,
      capacityClassroom: 250,
      capacityBanquet: 350,
      capacityCocktail: 600,
      size: 7200,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
      ]),
      features: JSON.stringify(['High-speed fiber connectivity', 'Dedicated pre-function area', 'Bridal green suite']),
      equipment: JSON.stringify(['4K laser projectors', 'Custom sound systems', 'Wireless staging']),
      location: 'Ground Floor, East Wing',
      naturalLight: false,
      outdoorAccess: true,
      featured: true,
    }
  });

  // 7. Offers
  console.log('Seeding Offers...');
  const dateIn1Year = new Date();
  dateIn1Year.setFullYear(dateIn1Year.getFullYear() + 1);

  await prisma.offer.createMany({
    data: [
      {
        name: 'The Tirupati Spiritual & Luxury Sanctuary',
        description: 'Combine your spiritual journey with world-class luxury stay. Includes complimentary premium VIP transfers to local temples, an early-morning traditional South Indian breakfast, and a 15% discount on all wellness therapies at the G7 Spa.',
        shortDescription: 'Complimentary temple transfers and premium breakfast.',
        type: 'PACKAGE',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1608958416715-0d3ee9a3d463?auto=format&fit=crop&w=1200&q=80'
        ]),
        startDate: new Date(),
        endDate: dateIn1Year,
        discountType: 'percentage',
        discountValue: 15,
        minStay: 2,
        applicableTo: JSON.stringify(['deluxe', 'suite']),
        terms: JSON.stringify(['Minimum 2 nights stay required', 'Must be booked 7 days in advance', 'Non-refundable cancel policy']),
        promoCode: 'DIVINESTAY',
        featured: true,
        sortOrder: 1,
      },
      {
        name: 'Sandalwood Spa Escape',
        description: 'Immerse yourself in sensory rejuvenation. Book any Suite or Royal Residence for 2 nights and enjoy a complimentary 60-minute Sandalwood & Saffron Radiant Facial for two.',
        shortDescription: 'Complimentary 60-minute sandalwood facial for two.',
        type: 'SPA',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
        ]),
        startDate: new Date(),
        endDate: dateIn1Year,
        discountType: 'fixed',
        discountValue: 5200,
        minStay: 2,
        applicableTo: JSON.stringify(['suite', 'royal']),
        terms: JSON.stringify(['Complimentary spa session requires booking via concierge', 'Valid only during standard operating hours']),
        promoCode: 'SPAESCAPE',
        featured: true,
        sortOrder: 2,
      }
    ]
  });

  // 8. Blog Posts
  console.log('Seeding Blog Posts...');
  await prisma.blogPost.createMany({
    data: [
      {
        slug: 'spiritual-journey-tirumala-srikalahasti',
        title: 'The Ultimate Guide to a Sacred Journey: Srikalahasti and Tirumala',
        excerpt: 'Discover the rich history, spiritual landmarks, and majestic architectural legacy of the famous twin temple towns, and how to plan your spiritual retreat.',
        content: 'Srikalahasti and Tirumala represent the absolute peak of cultural and spiritual heritage in southern India. Located only 30 minutes apart, Srikalahasti Temple is world-renowned for its magnificent air element Shiva linga and beautiful architecture, while Tirumala represents the home of Lord Venkateswara. Visited by millions of seekers annually, planning a journey requires care, especially when matching the rigorous schedule of local rituals with a peaceful luxury environment. G7 Hotels Tirupati offers an oasis of luxury located perfectly between these two heritage points, providing custom tour naturalists, premium VIP transport slots, and traditional organic cuisine to restore your senses.',
        authorName: 'Mohan Kumar',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        authorBio: 'Mohan is the Lead Heritage Concierge at G7 Hotels, possessing extensive research expertise in ancient temples and local art traditions.',
        category: 'Heritage & Travel',
        tags: JSON.stringify(['Spiritual', 'Travel Guide', 'Heritage']),
        featuredImage: 'https://images.unsplash.com/photo-1608958416715-0d3ee9a3d463?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(),
        status: 'PUBLISHED',
        metaTitle: 'Sacred Temples Guide: Srikalahasti & Tirumala | G7 Hotels',
        metaDescription: 'A guide to planning a spiritual and cultural temple trip to Srikalahasti and Tirumala while enjoying luxury accommodation.',
        keywords: JSON.stringify(['temple guide', 'tirumala', 'srikalahasti', 'luxury hotel']),
      },
      {
        slug: 'ayurveda-ancient-healing-for-modern-life',
        title: 'Reviving Ayurveda: Ancient Healing Secrets for Modern Lifestyles',
        excerpt: 'Learn how standard Ayurvedic therapies like Shirodhara and Abhyanga can restore high-stressed minds and modern fatigue.',
        content: 'In our high-paced modern lives, stress and fatigue often manifest physically. Ayurveda, the ancient Indian science of life, offers a highly customized approach to restore balance. By understanding your unique biological constitution (Doshas: Vata, Pitta, Kapha), you can design therapies that do not just treat symptoms but heal from within. At G7 Spa, our therapists specialize in Shirodhara and traditional Abhyanga oil treatments designed using fresh, organic oils and wild sandalwood. In this guide, we dive deep into how a 3-day wellness retreat can improve physical vitality, relieve insomnia, and recalibrate mental focus.',
        authorName: 'Dr. Sharanya Reddy',
        authorAvatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=300&q=80',
        authorBio: 'Dr. Sharanya is our Resident Ayurvedic Consultant, with a Doctorate in Vedic Wellness and over 15 years of clinical practice.',
        category: 'Spa & Wellness',
        tags: JSON.stringify(['Ayurveda', 'Wellness', 'Spa']),
        featuredImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(),
        status: 'PUBLISHED',
        metaTitle: 'Ayurveda & Modern Wellness Guide | G7 Hotels Spa',
        metaDescription: 'Discover the restorative power of Shirodhara and traditional Ayurvedic remedies at the luxury G7 Spa.',
        keywords: JSON.stringify(['ayurveda', 'wellness retreat', 'spa treatments', 'shirodhara']),
      }
    ]
  });

  // 9. Gallery Items
  console.log('Seeding Gallery Items...');
  await prisma.galleryItem.createMany({
    data: [
      {
        title: 'G7 Hotels Exterior Sunset Vista',
        description: 'The spectacular architectural facade of G7 Hotels, glowing brilliantly under a warm sunset sky.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        category: 'Exterior',
        tags: JSON.stringify(['Hotel', 'Luxury', 'Sunset']),
        alt: 'G7 Hotels exterior architecture during golden hour',
        order: 1,
      },
      {
        title: 'The Golden Leaf Interior Setting',
        description: 'Exquisite fine dining setup inside The Golden Leaf featuring rich crystal lighting.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        category: 'Dining',
        tags: JSON.stringify(['Restaurant', 'Fine Dining', 'Interior']),
        alt: 'Luxury dining tables at The Golden Leaf restaurant',
        order: 2,
      }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
