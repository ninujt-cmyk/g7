'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Tag, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const categories = [
  { id: 'all', label: 'All Posts', count: 12 },
  { id: 'travel', label: 'Travel Tips', count: 4 },
  { id: 'wellness', label: 'Wellness', count: 3 },
  { id: 'dining', label: 'Dining', count: 2 },
  { id: 'culture', label: 'Culture', count: 2 },
  { id: 'luxury', label: 'Luxury Living', count: 1 }
];

const blogPosts = [
  {
    id: 1,
    slug: 'ultimate-guide-luxury-india',
    title: 'The Ultimate Guide to Luxury Travel in India',
    excerpt: 'Discover the most exclusive destinations, hidden gems, and experiences that define luxury travel across India\'s most spectacular locations.',
    content: '',
    author: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Travel writer and luxury lifestyle expert'
    },
    category: 'travel',
    tags: ['Luxury Travel', 'India', 'Guide'],
    featuredImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    seo: {
      metaTitle: 'Ultimate Guide to Luxury Travel in India',
      metaDescription: 'Discover exclusive luxury travel destinations and experiences across India.',
      keywords: ['luxury travel', 'India', 'travel guide']
    },
    status: 'published',
    readTime: '8 min read',
    featured: true
  },
  {
    id: 2,
    slug: 'wellness-retreat-transform-mind-body',
    title: 'How Our Wellness Retreats Can Transform Your Mind and Body',
    excerpt: 'Immerse yourself in ancient healing traditions and modern wellness practices at our award-winning spa destinations.',
    content: '',
    author: {
      name: 'Dr. Ananya Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      bio: 'Wellness expert and Ayurveda practitioner'
    },
    category: 'wellness',
    tags: ['Wellness', 'Spa', 'Ayurveda'],
    featuredImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    seo: {
      metaTitle: 'Wellness Retreats at G7 Hotels',
      metaDescription: 'Transformative wellness experiences at our luxury spa destinations.',
      keywords: ['wellness', 'spa', 'ayurveda']
    },
    status: 'published',
    readTime: '6 min read',
    featured: true
  },
  {
    id: 3,
    slug: 'chef-secrets-indian-cuisine',
    title: 'Chef\'s Secrets: Mastering the Art of Indian Cuisine',
    excerpt: 'Our executive chefs share their tips and techniques for creating authentic Indian dishes at home.',
    content: '',
    author: {
      name: 'Vikram Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      bio: 'Executive Chef at G7 Hotels'
    },
    category: 'dining',
    tags: ['Cooking', 'Indian Cuisine', 'Chef Tips'],
    featuredImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    seo: {
      metaTitle: 'Indian Cooking Tips from G7 Chefs',
      metaDescription: 'Learn authentic Indian cooking techniques from our expert chefs.',
      keywords: ['indian cuisine', 'cooking tips', 'chef secrets']
    },
    status: 'published',
    readTime: '5 min read',
    featured: false
  },
  {
    id: 4,
    slug: 'best-places-visit-india-winter',
    title: 'Top 10 Places to Visit in India This Winter',
    excerpt: 'From snowy mountains to sunny beaches, discover India\'s most captivating winter destinations.',
    content: '',
    author: {
      name: 'Rahul Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Travel journalist and photographer'
    },
    category: 'travel',
    tags: ['Winter Travel', 'India', 'Destinations'],
    featuredImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    seo: {
      metaTitle: 'Winter Destinations in India',
      metaDescription: 'Best places to visit in India during winter season.',
      keywords: ['winter travel', 'india destinations', 'travel guide']
    },
    status: 'published',
    readTime: '7 min read',
    featured: false
  },
  {
    id: 5,
    slug: 'sustainable-luxury-hotel-stays',
    title: 'Sustainable Luxury: Eco-Friendly Practices in Hotel Stays',
    excerpt: 'Learn how G7 Hotels is leading the way in sustainable luxury hospitality without compromising on comfort.',
    content: '',
    author: {
      name: 'Meera Nair',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      bio: 'Sustainability consultant'
    },
    category: 'luxury',
    tags: ['Sustainability', 'Eco-Friendly', 'Luxury'],
    featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    seo: {
      metaTitle: 'Sustainable Luxury Hotels',
      metaDescription: 'Eco-friendly luxury hospitality at G7 Hotels.',
      keywords: ['sustainability', 'eco-friendly', 'luxury hotels']
    },
    status: 'published',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 6,
    slug: 'indian-festivals-guide',
    title: 'A Guide to India\'s Most Colorful Festivals',
    excerpt: 'Experience the vibrant celebrations and rich cultural traditions that make India\'s festivals unforgettable.',
    content: '',
    author: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Travel writer and luxury lifestyle expert'
    },
    category: 'culture',
    tags: ['Festivals', 'Culture', 'India'],
    featuredImage: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2023-12-28'),
    updatedAt: new Date('2023-12-28'),
    seo: {
      metaTitle: 'Indian Festivals Guide',
      metaDescription: 'Explore India\'s most colorful and vibrant festivals.',
      keywords: ['indian festivals', 'culture', 'celebrations']
    },
    status: 'published',
    readTime: '8 min read',
    featured: false
  },
  {
    id: 7,
    slug: 'yoga-meditation-retreat-benefits',
    title: 'The Benefits of a Yoga and Meditation Retreat',
    excerpt: 'Discover how a dedicated yoga and meditation retreat can rejuvenate your mind, body, and spirit.',
    content: '',
    author: {
      name: 'Dr. Ananya Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      bio: 'Wellness expert and Ayurveda practitioner'
    },
    category: 'wellness',
    tags: ['Yoga', 'Meditation', 'Wellness'],
    featuredImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20'),
    seo: {
      metaTitle: 'Yoga and Meditation Retreat Benefits',
      metaDescription: 'Benefits of yoga and meditation retreats at G7 Hotels.',
      keywords: ['yoga', 'meditation', 'wellness retreat']
    },
    status: 'published',
    readTime: '5 min read',
    featured: false
  },
  {
    id: 8,
    slug: 'fine-dining-etiquette-guide',
    title: 'Mastering Fine Dining Etiquette: A Complete Guide',
    excerpt: 'Navigate any luxury dining experience with confidence using our comprehensive etiquette guide.',
    content: '',
    author: {
      name: 'Vikram Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      bio: 'Executive Chef at G7 Hotels'
    },
    category: 'dining',
    tags: ['Dining Etiquette', 'Fine Dining', 'Guide'],
    featuredImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15'),
    seo: {
      metaTitle: 'Fine Dining Etiquette Guide',
      metaDescription: 'Complete guide to fine dining etiquette and table manners.',
      keywords: ['dining etiquette', 'fine dining', 'table manners']
    },
    status: 'published',
    readTime: '7 min read',
    featured: false
  },
  {
    id: 9,
    slug: 'hidden-gems-mumbai',
    title: 'Hidden Gems of Mumbai: Beyond the Tourist Trail',
    excerpt: 'Explore Mumbai\'s lesser-known treasures, from historic neighborhoods to local culinary secrets.',
    content: '',
    author: {
      name: 'Rahul Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Travel journalist and photographer'
    },
    category: 'travel',
    tags: ['Mumbai', 'Hidden Gems', 'Local Culture'],
    featuredImage: 'https://images.unsplash.com/photo-1566417053891-8f69a3d25b28?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2023-12-10'),
    updatedAt: new Date('2023-12-10'),
    seo: {
      metaTitle: 'Hidden Gems of Mumbai',
      metaDescription: 'Discover Mumbai\'s secret spots and local attractions.',
      keywords: ['mumbai', 'hidden gems', 'local culture']
    },
    status: 'published',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 10,
    slug: 'ayurveda-wellness',
    title: 'Ancient Wisdom: Ayurveda for Modern Wellness',
    excerpt: 'Learn how the ancient science of Ayurveda can transform your health and well-being.',
    content: '',
    author: {
      name: 'Dr. Ananya Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      bio: 'Wellness expert and Ayurveda practitioner'
    },
    category: 'wellness',
    tags: ['Ayurveda', 'Wellness', 'Health'],
    featuredImage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2023-12-05'),
    updatedAt: new Date('2023-12-05'),
    seo: {
      metaTitle: 'Ayurveda for Modern Wellness',
      metaDescription: 'How Ayurveda can improve your health and well-being.',
      keywords: ['ayurveda', 'wellness', 'health']
    },
    status: 'published',
    readTime: '8 min read',
    featured: false
  },
  {
    id: 11,
    slug: 'indian-art-architecture',
    title: 'The Rich Heritage of Indian Art and Architecture',
    excerpt: 'Journey through India\'s magnificent artistic traditions, from ancient temples to modern masterpieces.',
    content: '',
    author: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Travel writer and luxury lifestyle expert'
    },
    category: 'culture',
    tags: ['Art', 'Architecture', 'Heritage'],
    featuredImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2023-11-28'),
    updatedAt: new Date('2023-11-28'),
    seo: {
      metaTitle: 'Indian Art and Architecture',
      metaDescription: 'Explore India\'s rich artistic heritage and architectural wonders.',
      keywords: ['indian art', 'architecture', 'heritage']
    },
    status: 'published',
    readTime: '9 min read',
    featured: false
  },
  {
    id: 12,
    slug: 'honeymoon-india-romantic',
    title: 'The Most Romantic Destinations for Your Indian Honeymoon',
    excerpt: 'Create unforgettable memories with our guide to India\'s most romantic honeymoon destinations.',
    content: '',
    author: {
      name: 'Rahul Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Travel journalist and photographer'
    },
    category: 'travel',
    tags: ['Honeymoon', 'Romantic', 'Destinations'],
    featuredImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    gallery: [],
    publishedAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-20'),
    seo: {
      metaTitle: 'Romantic Honeymoon Destinations in India',
      metaDescription: 'Best romantic destinations for honeymoons in India.',
      keywords: ['honeymoon', 'romantic destinations', 'india travel']
    },
    status: 'published',
    readTime: '7 min read',
    featured: false
  }
];

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop"
            alt="G7 Hotels Journal"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-[#C9A45C]" />
            <h1 className="text-5xl md:text-7xl font-serif mb-6">The G7 Journal</h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              Stories, Insights, and Inspiration for the Discerning Traveler
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-[#C9A45C] text-[#1A1A1A]">Featured</Badge>
              </div>
              <Card className="overflow-hidden border-2 border-[#C9A45C]/30 hover:border-[#C9A45C] transition-colors">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="outline">{categories.find(c => c.id === featuredPost.category)?.label}</Badge>
                      <span className="text-sm text-[#1A1A1A]/60 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(featuredPost.publishedAt, 'MMM dd, yyyy')}
                      </span>
                      <span className="text-sm text-[#1A1A1A]/60 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-[#1A1A1A]/70 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-[#1A1A1A]">{featuredPost.author.name}</p>
                          <p className="text-xs text-[#1A1A1A]/60">{featuredPost.author.bio}</p>
                        </div>
                      </div>
                      <Button asChild variant="ghost" className="text-[#C9A45C] hover:text-[#C9A45C]/80">
                        <Link href={`/journal/${featuredPost.slug}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section className="sticky top-0 z-10 bg-[#F8F6F2] border-b border-[#1A1A1A]/10 py-4 px-4 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1A]/40 w-5 h-5" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="bg-white border border-[#1A1A1A]/10 overflow-x-auto w-full justify-start">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex-shrink-0 data-[state=active]:bg-[#C9A45C] data-[state=active]:text-[#1A1A1A]"
                  >
                    {category.label}
                    <Badge variant="secondary" className="ml-2 bg-[#1A1A1A]/10 text-[#1A1A1A]">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.filter(post => !post.featured || selectedCategory !== 'all').map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
              >
                <Card className="overflow-hidden group h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#C9A45C] text-[#1A1A1A]">
                      {categories.find(c => c.id === post.category)?.label}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-sm text-[#1A1A1A]/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(post.publishedAt, 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-serif text-[#1A1A1A] mb-3 group-hover:text-[#C9A45C] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-[#1A1A1A]/70 mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-[#1A1A1A]/5 text-[#1A1A1A]/70">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-sm text-[#1A1A1A]/80">{post.author.name}</span>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-[#C9A45C] hover:text-[#C9A45C]/80">
                        <Link href={`/journal/${post.slug}`}>
                          Read
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-[#1A1A1A]/20" />
              <p className="text-xl text-[#1A1A1A]/60">No articles found. Try different filters or search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#F8F6F2] mb-6">
              Stay Inspired
            </h2>
            <p className="text-xl text-[#F8F6F2]/70 mb-8">
              Subscribe to our newsletter for the latest stories, travel tips, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-[#F8F6F2] placeholder:text-[#F8F6F2]/50"
              />
              <Button
                size="lg"
                className="bg-[#C9A45C] text-[#1A1A1A] hover:bg-[#F8F6F2]"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
