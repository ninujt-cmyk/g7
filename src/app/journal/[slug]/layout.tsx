import type { Metadata } from 'next';
import { db } from '@/lib/db';

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

// Fallback metadata mapping for hardcoded static posts
const fallbackMetadata: Record<string, { title: string; description: string }> = {
  'ultimate-guide-luxury-india': {
    title: 'The Ultimate Guide to Luxury Travel in India | G7 Hotels',
    description: 'Discover the most exclusive destinations, hidden gems, and experiences that define luxury travel across India\'s most spectacular locations.',
  },
  'wellness-retreat-transform-mind-body': {
    title: 'How Our Wellness Retreats Can Transform Your Mind and Body | G7 Hotels',
    description: 'Immerse yourself in ancient healing traditions and modern wellness practices at our award-winning spa destinations.',
  },
  'chef-secrets-indian-cuisine': {
    title: 'Chef\'s Secrets: Mastering the Art of Indian Cuisine | G7 Hotels',
    description: 'Our executive chefs share their tips and techniques for creating authentic Indian dishes at home.',
  },
  'best-places-visit-india-winter': {
    title: 'Top 10 Places to Visit in India This Winter | G7 Hotels',
    description: 'From snowy mountains to sunny beaches, discover India\'s most captivating winter destinations.',
  },
  'sustainable-luxury-hotel-stays': {
    title: 'Sustainable Luxury: Eco-Friendly Practices in Hotel Stays | G7 Hotels',
    description: 'Learn how G7 Hotels is leading the way in sustainable luxury hospitality without compromising on comfort.',
  },
  'indian-festivals-guide': {
    title: 'A Guide to India\'s Most Colorful Festivals | G7 Hotels',
    description: 'Experience the vibrant celebrations and rich cultural traditions that make India\'s festivals unforgettable.',
  },
  'yoga-meditation-retreat-benefits': {
    title: 'The Benefits of a Yoga and Meditation Retreat | G7 Hotels',
    description: 'Discover how a dedicated yoga and meditation retreat can rejuvenate your mind, body, and spirit.',
  },
  'fine-dining-etiquette-guide': {
    title: 'Mastering Fine Dining Etiquette: A Complete Guide | G7 Hotels',
    description: 'Navigate any luxury dining experience with confidence using our comprehensive etiquette guide.',
  },
  'hidden-gems-mumbai': {
    title: 'Hidden Gems of Mumbai: Beyond the Tourist Trail | G7 Hotels',
    description: 'Explore Mumbai\'s lesser-known treasures, from historic neighborhoods to local culinary secrets.',
  },
  'ayurveda-wellness': {
    title: 'Ancient Wisdom: Ayurveda for Modern Wellness | G7 Hotels',
    description: 'Learn how the ancient science of Ayurveda can transform your health and well-being.',
  },
  'indian-art-architecture': {
    title: 'The Rich Heritage of Indian Art and Architecture | G7 Hotels',
    description: 'Journey through India\'s magnificent artistic traditions, from ancient temples to modern masterpieces.',
  },
  'honeymoon-india-romantic': {
    title: 'The Most Romantic Destinations for Your Indian Honeymoon | G7 Hotels',
    description: 'Create unforgettable memories with our guide to India\'s most romantic honeymoon destinations.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    // Check database first
    const post = await db.blogPost.findUnique({
      where: { slug },
    });

    if (post) {
      return {
        title: `${post.title} | G7 Hotels Journal`,
        description: post.excerpt || `${post.title}. Read the latest luxury travel insights from G7 Hotels.`,
        openGraph: {
          title: `${post.title} - G7 Hotels Journal`,
          description: post.excerpt,
          type: 'article',
          publishedTime: post.publishedAt?.toISOString(),
          images: [post.featuredImage],
        }
      };
    }

    // Fallback to static mapping
    const fallback = fallbackMetadata[slug];
    if (fallback) {
      return {
        title: fallback.title,
        description: fallback.description,
        openGraph: {
          title: fallback.title,
          description: fallback.description,
          type: 'article',
        }
      };
    }
  } catch (error) {
    console.error('Error generating blog post metadata:', error);
  }

  return {
    title: 'G7 Hotels Journal | Luxury Travel & Heritage Blog',
    description: 'Explore the latest articles on luxury travel, Ayurvedic wellness, culinary arts, and regional heritage at G7 Hotels.',
  };
}

export default function BlogPostDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
