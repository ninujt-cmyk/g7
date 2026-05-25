import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Calendar, Clock, User, ArrowLeft, Tag, BookOpen, Share2, Facebook, Twitter, Linkedin, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

// Complete fallback mock blog data for all 12 hardcoded static blog posts
const fallbackPosts: Record<string, any> = {
  'ultimate-guide-luxury-india': {
    title: 'The Ultimate Guide to Luxury Travel in India',
    excerpt: 'Discover the most exclusive destinations, hidden gems, and experiences that define luxury travel across India\'s most spectacular locations.',
    content: `India is a land of sensory overload, but beneath its vibrant chaos lies an ancient tradition of ultimate luxury hospitality. From the palaces of Rajasthan where maharajas once ruled to the serene houseboats of Kerala, luxury travel in India is about deep immersion, heritage, and unparalleled service.

    In this guide, we explore the ultimate heritage destinations:
    
    1. **Tirupati & Srikalahasti:** Discover the Rayalaseema heritage, ancient temples, and exquisite local Kalamkari hand-painted art. Stay at the luxurious G7 Hotels where spiritual journeys meet premium living.
    2. **The Palace Trail in Rajasthan:** Sleep in imperial chambers at Udaipur's Lake Palace or Jaipur's Rambagh Palace, where every request is met with legendary Indian hospitality.
    3. **The Backwaters of Kerala:** Cruise along misty coconut groves in custom-crafted luxury houseboats, complete with your private chef and Ayurvedic spa therapist.
    4. **The Majestic Himalayas:** Rejuvenate your mind and spirit in elite wellness sanctuaries overlooking the sacred Ganges.
    
    To experience luxury in India is to experience warmth, detail, and a philosophy that treats every guest as a divine presence.`,
    author: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Travel writer and luxury lifestyle expert'
    },
    category: 'travel',
    tags: ['Luxury Travel', 'India', 'Guide'],
    featuredImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=800&fit=crop',
    publishedAt: new Date('2024-01-15'),
    readTime: '8 min read',
  },
  'wellness-retreat-transform-mind-body': {
    title: 'How Our Wellness Retreats Can Transform Your Mind and Body',
    excerpt: 'Immerse yourself in ancient healing traditions and modern wellness practices at our award-winning spa destinations.',
    content: `Modern life moves at a relentless pace. Between screens, deadlines, and daily responsibilities, our nervous systems rarely get a chance to reset. A wellness retreat is not just a vacation; it is a holistic intervention designed to bring you back to balance.

    At G7 Hotels, we believe in the integration of ancient Ayurvedic wisdom and contemporary wellness. Here is how our wellness retreats facilitate transformation:
    
    * **Panchakarma and Detox:** Gently purge environmental and mental toxins under the supervision of expert Ayurvedic doctors.
    * **The Flow of Shirodhara:** Experience the blissful sensation of warm herbal oils gently poured on your third-eye chakra to dissolve stress and cure insomnia.
    * **Mindful Movement & Yoga:** Daily sunrise yoga sessions surrounded by nature, helping you coordinate breath and movement.
    * **Nourishing Cuisine:** Custom organic meals crafted based on your unique body constitution (Vata, Pitta, Kapha) to fuel and heal from within.
    
    Investing in a wellness retreat is an act of deep self-care that builds resilience, restores cellular health, and clarifies the mind.`,
    author: {
      name: 'Dr. Ananya Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      bio: 'Wellness expert and Ayurveda practitioner'
    },
    category: 'wellness',
    tags: ['Wellness', 'Spa', 'Ayurveda'],
    featuredImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop',
    publishedAt: new Date('2024-01-10'),
    readTime: '6 min read',
  },
  'chef-secrets-indian-cuisine': {
    title: 'Chef\'s Secrets: Mastering the Art of Indian Cuisine',
    excerpt: 'Our executive chefs share their tips and techniques for creating authentic Indian dishes at home.',
    content: `Indian cuisine is often misunderstood as merely "spicy" or overly heavy. In reality, it is a sophisticated culinary science where spices are toasted, bloomed, and combined to unlock deep health benefits and complex flavor dimensions.

    Our Executive Chef Vikram Mehta shares his three primary culinary secrets to elevate your home cooking:
    
    1. **The Art of Tempering (Tadka):** Never add spices directly to water or cold dishes. Bloom them in hot organic ghee or oil first. Mustard seeds should pop, cumin should darken, and curry leaves should crackle to release their essential oils.
    2. **Freshness of Masalas:** Store-bought pre-ground spices lose their volatility within weeks. Roast whole spices (coriander seeds, cardamom, cinnamon, cloves) lightly on a dry pan and grind them fresh before each curry.
    3. **The Balance of Sourness:** A great Indian curry needs a counterpoint to richness. Whether using fresh tamarind paste, sour curd, or dry mango powder (amchur), balancing sourness unlocks the true complexity of local gravies.
    
    Practice these steps, and you will begin to master the authentic, royal heritage flavors of classical Indian dining.`,
    author: {
      name: 'Vikram Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      bio: 'Executive Chef at G7 Hotels'
    },
    category: 'dining',
    tags: ['Cooking', 'Indian Cuisine', 'Chef Tips'],
    featuredImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&h=800&fit=crop',
    publishedAt: new Date('2024-01-08'),
    readTime: '5 min read',
  },
  'best-places-visit-india-winter': {
    title: 'Top 10 Places to Visit in India This Winter',
    excerpt: 'From snowy mountains to sunny beaches, discover India\'s most captivating winter destinations.',
    content: `Winter is arguably the most beautiful season to travel in India. The scorching heat subsides, leaving behind crisp blue skies, cool breezes, and lush post-monsoon landscapes. Whether you crave the warmth of sandy beaches or the dramatic quiet of snow-covered peaks, India during winter is a traveler's paradise.

    Here are our curated top destinations for a winter getaway:
    - **Srikalahasti & Tirupati:** Experience pleasant Rayalaseema breezes, scenic forest treks in Merlapaka hills, and powerful spiritual energy under cool winter skies.
    - **Gulmarg, Kashmir:** Experience the magic of a white winter, ski down powdery slopes, and warm up by a wood fire with hot Kahwa.
    - **Goa & Gokarna:** Bask under the gentle winter sun, enjoy beach side dining, and watch spectacular ocean sunsets.
    - **Jaisalmer & Jodhpur:** Explore royal desert forts, sleep under starry skies, and enjoy rich Rajasthani cultural heritage.`,
    author: {
      name: 'Rahul Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Travel journalist and photographer'
    },
    category: 'travel',
    tags: ['Winter Travel', 'India', 'Destinations'],
    featuredImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=800&fit=crop',
    publishedAt: new Date('2024-01-05'),
    readTime: '7 min read',
  },
  'sustainable-luxury-hotel-stays': {
    title: 'Sustainable Luxury: Eco-Friendly Practices in Hotel Stays',
    excerpt: 'Learn how G7 Hotels is leading the way in sustainable luxury hospitality without compromising on comfort.',
    content: `For decades, "luxury" in hotels meant indulgence without limits—excessive plastic, massive energy wastage, and imported goods. Today, a new definition has emerged. Discerning travelers seek conscious luxury—a stay that respects the local environment, supports the community, and preserves heritage.

    At G7 Hotels, we are leading this transition through active green initiatives:
    
    * **Zero Single-Use Plastic:** Replaced plastic toiletries and bottles with locally sourced biodegradable alternatives and custom glass bottling plants.
    * **Farm-to-Table Dining:** Over 70% of our dining ingredients are sourced from organic local farms located within 50 kilometers of Srikalahasti and Tirupati.
    * **Solar Integration:** Harnessing clean solar energy to power our heating and hot water systems.
    * **Kalamkari Artisans Support:** Partnering directly with regional hand-painted Kalamkari artists to decorate our suites, keeping ancient tribal arts alive.
    
    Green operations do not compromise comfort; they elevate it, giving our guests peace of mind and connecting them deeply to the local soil.`,
    author: {
      name: 'Meera Nair',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      bio: 'Sustainability consultant'
    },
    category: 'luxury',
    tags: ['Sustainability', 'Eco-Friendly', 'Luxury'],
    featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop',
    publishedAt: new Date('2024-01-03'),
    readTime: '6 min read',
  },
  'indian-festivals-guide': {
    title: 'A Guide to India\'s Most Colorful Festivals',
    excerpt: 'Experience the vibrant celebrations and rich cultural traditions that make India\'s festivals unforgettable.',
    content: `To understand the soul of India, one must experience its festivals. They are explosive expressions of color, devotion, dance, and gastronomy that unite families and communities. Each region celebrates with distinct rituals and stories.

    Key festivals you should add to your bucket list:
    - **Diwali (Festival of Lights):** The triumph of light over darkness, celebrated with millions of oil lamps, sparkling fireworks, and sweet delicacies.
    - **Holi (Festival of Colors):** The welcoming of spring, where streets dissolve into a rainbow of colored powders, music, and joy.
    - **Navratri & Dussehra:** Nine nights of energetic Garba folk dancing, culminating in dramatic theatrical acts celebrating the victory of goodness.
    - **Makar Sankranti & Pongal:** The harvest festival, marked by colorful kites filling the skies and traditional sweet rice recipes.`,
    author: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Travel writer and luxury lifestyle expert'
    },
    category: 'culture',
    tags: ['Festivals', 'Culture', 'India'],
    featuredImage: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1200&h=800&fit=crop',
    publishedAt: new Date('2023-12-28'),
    readTime: '8 min read',
  },
  'yoga-meditation-retreat-benefits': {
    title: 'The Benefits of a Yoga and Meditation Retreat',
    excerpt: 'Discover how a dedicated yoga and meditation retreat can rejuvenate your mind, body, and spirit.',
    content: `Yoga is not just physical exercise; it is an integrated system of self-realization. Meditation is not just empty sitting; it is the training of focused attention. When you combine them within a structured, peaceful retreat, the mental and physical benefits are compound.

    Key benefits documented by our wellness guides:
    - **Cortisol Reduction:** Dissolves chronic flight-or-fight hormones, restoring healthy blood pressure and heart rates.
    - **Mental Clarity:** Quiets the background chatter of the mind, opening up creativity, concentration, and emotional stability.
    - **Physical Alignment:** Improves posture, joint flexibility, and muscular tone through guided, safe yogic postures (Asanas).
    - **Spiritual Reconnection:** Helps you step back from daily busy schedules to discover your inner peace.`,
    author: {
      name: 'Dr. Ananya Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      bio: 'Wellness expert and Ayurveda practitioner'
    },
    category: 'wellness',
    tags: ['Yoga', 'Meditation', 'Wellness'],
    featuredImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=800&fit=crop',
    publishedAt: new Date('2023-12-20'),
    readTime: '5 min read',
  },
  'fine-dining-etiquette-guide': {
    title: 'Mastering Fine Dining Etiquette: A Complete Guide',
    excerpt: 'Navigate any luxury dining experience with confidence using our comprehensive etiquette guide.',
    content: `Fine dining is an exquisite theatrical performance where both the culinary team and the guests play a part. Navigating a multi-course dinner under pristine crystal chandeliers can feel intimidating, but key guidelines ensure you dine with absolute ease.

    Essential rules of luxury dining etiquette:
    1. **The Silverware Map:** Work your way from the outside in. The utensils furthest from your plate are for your early courses (soup, salad), while those closest are for your main course.
    2. **The Napkin Rule:** As soon as you sit down, place your napkin gently on your lap. If you need to excuse yourself from the table, place it neatly on your chair, not the table.
    3. **Glass Placement:** Your water glass is positioned directly above your dinner knife, with wine glasses clustered to the right.
    4. **Conversing with Chefs:** Do not hesitate to ask your sommelier or server about ingredient sourcing, flavor profiles, or custom pairings—it shows appreciation for the craftsmanship.`,
    author: {
      name: 'Vikram Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      bio: 'Executive Chef at G7 Hotels'
    },
    category: 'dining',
    tags: ['Dining Etiquette', 'Fine Dining', 'Guide'],
    featuredImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop',
    publishedAt: new Date('2023-12-15'),
    readTime: '7 min read',
  },
  'hidden-gems-mumbai': {
    title: 'Hidden Gems of Mumbai: Beyond the Tourist Trail',
    excerpt: 'Explore Mumbai\'s lesser-known treasures, from historic neighborhoods to local culinary secrets.',
    content: `Mumbai is a city of high-rises and crowded local trains, but it also hides secret pockets of absolute magic. Beyond the Gateway of India and Marine Drive lies a rich history of local fishing villages, colonial bungalows, and quiet art lanes.

    Explore these hidden gems:
    - **Khotachiwadi Village:** A beautiful heritage pocket of old Portuguese-style wooden cottages tucked in the middle of Girgaon.
    - **The Banganga Tank:** A serene, 12th-century sacred water tank surrounded by historic temples and narrow steps, providing a peaceful quiet away from the city traffic.
    - **Sassoon Docks Art Project:** Vibrant graffiti and art installations taking over colonial maritime docks.
    - **Chor Bazaar Culinary Lanes:** Discover the best slow-cooked Mughlai kebabs, hand-churned ice cream (sancha), and street sweets.`,
    author: {
      name: 'Rahul Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Travel journalist and photographer'
    },
    category: 'travel',
    tags: ['Mumbai', 'Hidden Gems', 'Local Culture'],
    featuredImage: 'https://images.unsplash.com/photo-1566417053891-8f69a3d25b28?w=1200&h=800&fit=crop',
    publishedAt: new Date('2023-12-10'),
    readTime: '6 min read',
  },
  'ayurveda-wellness': {
    title: 'Ancient Wisdom: Ayurveda for Modern Wellness',
    excerpt: 'Learn how the ancient science of Ayurveda can transform your health and well-being.',
    content: `Ayurveda, translating to "The Science of Life," is a 5,000-year-old medical system that focuses on preventative health and mind-body harmony. In contrast to modern medicine which often targets symptoms, Ayurveda evaluates the root cause of imbalance by analyzing your constitution.

    Understand your Doshas to calibrate daily life:
    - **Vata (Air & Space):** Governs movement and creativity. Balance with warm, grounding foods and relaxing oil massages.
    - **Pitta (Fire & Water):** Governs digestion and intellect. Balance with cooling foods, sandalwood, and avoiding excess heat.
    - **Prana & Abhyanga:** Pamper your skin with daily self-massage (Abhyanga) using sesame oil to improve circulation, flush toxins, and ground the mind.
    - **Restorative Sleep:** Establish a solid sleep routine, drinking warm milk with nutmeg or cardamom before bed to calm the mind.`,
    author: {
      name: 'Dr. Ananya Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      bio: 'Wellness expert and Ayurveda practitioner'
    },
    category: 'wellness',
    tags: ['Ayurveda', 'Wellness', 'Health'],
    featuredImage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=800&fit=crop',
    publishedAt: new Date('2023-12-05'),
    readTime: '8 min read',
  },
  'indian-art-architecture': {
    title: 'The Rich Heritage of Indian Art and Architecture',
    excerpt: 'Journey through India\'s magnificent artistic traditions, from ancient temples to modern masterpieces.',
    content: `India's art and architecture represent some of the most spectacular, complex human achievements. From the rock-cut caves of Ajanta and Ellora to the soaring gopurams of South Indian temples, every stone was carved to express cosmic geometry and deep stories.

    Highlight heritage monuments to study:
    - **The Sacred Geometry of Srikalahasti:** Discover the magnificent Dravidian stone architecture, pillar assemblies, and soaring entrances built by the Chola and Vijayanagara kings.
    - **The Intricate Sun Temple of Konark:** A colossal stone chariot carved with solar wheels and symbolic sculptures.
    - **Sanchi Stupa:** The ancient brick domes dating back to Emperor Ashoka, showcasing pristine early Buddhist relief panels.
    - **Modernist Masterpieces:** The integration of traditional courtyards and contemporary architecture in luxury hotels like G7.`,
    author: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Travel writer and luxury lifestyle expert'
    },
    category: 'culture',
    tags: ['Art', 'Architecture', 'Heritage'],
    featuredImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=800&fit=crop',
    publishedAt: new Date('2023-11-28'),
    readTime: '9 min read',
  },
  'honeymoon-india-romantic': {
    title: 'The Most Romantic Destinations for Your Indian Honeymoon',
    excerpt: 'Create unforgettable memories with our guide to India\'s most romantic honeymoon destinations.',
    content: `Your honeymoon should be an opulent escape—a time to unwind together in spectacular settings, pamper your senses, and build memories to cherish forever. India offers some of the most romantically charged locations in the world.

    Curated romantic highlights:
    - **Udaipur (City of Lakes):** Enjoy private sunset boat cruises, dine under stars, and live inside floating white marble palaces.
    - **G7 Hotels Suite Escape:** Treat yourselves to private pool residences, couples Shirodhara massage rituals, and fine dining candlelight experiences in Srikalahasti.
    - **Munnar & Wayanad:** Hide away in luxury tree houses overlooking emerald tea plantations and misty valleys.
    - **The Havelock Beaches:** Stroll hand-in-hand along white-sand beaches, swim in turquoise waters, and enjoy fresh seafood.`,
    author: {
      name: 'Rahul Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Travel journalist and photographer'
    },
    category: 'travel',
    tags: ['Honeymoon', 'Romantic', 'Destinations'],
    featuredImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop',
    publishedAt: new Date('2023-11-20'),
    readTime: '7 min read',
  },
};

export default async function BlogPostDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let post: any = null;

  // 1. Try to fetch from SQLite database first
  try {
    const dbPost = await db.blogPost.findUnique({
      where: { slug },
    });

    if (dbPost) {
      post = {
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        author: {
          name: dbPost.authorName || 'G7 Contributor',
          avatar: dbPost.authorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          bio: dbPost.authorBio || 'Luxury Travel Expert'
        },
        category: dbPost.category.toLowerCase().includes('heritage') ? 'travel' : 
                  dbPost.category.toLowerCase().includes('spa') ? 'wellness' : 'culture',
        categoryLabel: dbPost.category,
        tags: JSON.parse(dbPost.tags || '[]'),
        featuredImage: dbPost.featuredImage,
        publishedAt: dbPost.publishedAt || dbPost.createdAt,
        readTime: `${Math.ceil((dbPost.content?.split(' ').length || 200) / 150)} min read`,
      };
    }
  } catch (error) {
    console.error('Error fetching blog post from database:', error);
  }

  // 2. Fall back to our comprehensive hardcoded dictionary if not found in DB
  if (!post) {
    post = fallbackPosts[slug];
  }

  // 3. Trigger 404 if post doesn't exist in either database or fallback dictionary
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F2]">
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation & Breadcrumb */}
          <div className="mb-8 flex items-center justify-between">
            <Link 
              href="/journal" 
              className="inline-flex items-center gap-2 text-sm text-[#1A1A1A]/70 hover:text-[#C9A45C] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Journal
            </Link>
            <div className="text-xs text-[#1A1A1A]/40 uppercase tracking-widest">
              G7 Journal &bull; {post.categoryLabel || post.category}
            </div>
          </div>

          {/* Article Header */}
          <article className="bg-white rounded-2xl overflow-hidden border border-[#1A1A1A]/5 shadow-sm p-6 sm:p-10">
            <div className="space-y-6">
              <Badge className="bg-[#C9A45C] text-[#1A1A1A] hover:bg-[#C9A45C]/90 text-sm py-1 px-3">
                {post.categoryLabel || post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </Badge>
              
              <h1 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] leading-tight">
                {post.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#1A1A1A]/70 font-light leading-relaxed italic border-l-4 border-[#C9A45C] pl-4">
                {post.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#1A1A1A]/60 py-4 border-y border-[#1A1A1A]/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C9A45C]" />
                  <span>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</span>
                </div>
                <Separator orientation="vertical" className="h-4 bg-[#1A1A1A]/10 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A45C]" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative h-64 sm:h-[450px] w-full rounded-xl overflow-hidden shadow-inner my-8">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Rich Body Content */}
              <div className="prose prose-lg max-w-none text-[#1A1A1A]/85 leading-relaxed space-y-6 pt-4 font-sans text-base sm:text-lg">
                {post.content.split('\n\n').map((paragraph: string, idx: number) => {
                  // Basic list matching
                  if (paragraph.trim().startsWith('*') || paragraph.trim().startsWith('-')) {
                    const listItems = paragraph.split('\n').map(item => item.replace(/^[\*\-\s]+/, '').trim());
                    return (
                      <ul key={idx} className="list-disc pl-6 space-y-2 text-[#1A1A1A]/80 my-4">
                        {listItems.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  
                  // Basic numbered list matching
                  if (/^\d+\./.test(paragraph.trim())) {
                    const listItems = paragraph.split('\n').map(item => item.replace(/^\d+\.[\s]+/, '').trim());
                    return (
                      <ol key={idx} className="list-decimal pl-6 space-y-2 text-[#1A1A1A]/80 my-4">
                        {listItems.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ol>
                    );
                  }

                  return (
                    <p key={idx} className="whitespace-pre-line leading-relaxed sm:leading-loose">
                      {paragraph.trim()}
                    </p>
                  );
                })}
              </div>

              {/* Article Footer & Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-8 mt-10 border-t border-[#1A1A1A]/10">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]/60 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#C9A45C]" /> Tagged In
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-[#1A1A1A]/5 text-[#1A1A1A]/70 hover:bg-[#C9A45C]/10 border border-[#1A1A1A]/5 px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Profile Card */}
              <div className="mt-12 bg-[#F8F6F2] border border-[#1A1A1A]/5 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left transition-transform hover:scale-[1.01]">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#C9A45C]/30 shadow-sm">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C]">
                    Written By
                  </div>
                  <h3 className="text-xl font-serif text-[#1A1A1A]">
                    {post.author.name}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-light">
                    {post.author.bio}
                  </p>
                </div>
              </div>

            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
