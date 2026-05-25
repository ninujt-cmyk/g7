import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /sitemap.xml
 * Dynamically generates a standard XML sitemap for search engine crawlers (Google, Bing, etc.)
 * mapping all static pages, dynamic rooms, restaurants, and journals from the database.
 */
export async function GET() {
  const baseUrl = 'https://www.g7hotels.in';

  // 1. Core Static Pages
  const staticPaths = [
    '',
    '/about',
    '/accessibility',
    '/booking',
    '/careers',
    '/contact',
    '/cookies',
    '/dining',
    '/events',
    '/events/venues',
    '/experiences',
    '/faq',
    '/gallery',
    '/help',
    '/journal',
    '/loyalty',
    '/offers',
    '/press',
    '/privacy',
    '/register',
    '/reviews-policy',
    '/rooms',
    '/sitemap',
    '/spa',
    '/terms',
  ];

  // 2. Dynamic Rooms from SQLite
  let rooms: any[] = [];
  try {
    rooms = await db.room.findMany({ where: { active: true } });
  } catch (error) {
    console.error('Error fetching rooms for XML sitemap:', error);
  }

  // 3. Dynamic Dining from SQLite
  let restaurants: any[] = [];
  try {
    restaurants = await db.restaurant.findMany({ where: { active: true } });
  } catch (error) {
    console.error('Error fetching dining for XML sitemap:', error);
  }

  // 4. Dynamic Blogs from SQLite
  let posts: any[] = [];
  try {
    posts = await db.blogPost.findMany({ where: { status: 'PUBLISHED' } });
  } catch (error) {
    console.error('Error fetching blogs for XML sitemap:', error);
  }

  // 5. Fallback static blogs
  const staticBlogs = [
    'ultimate-guide-luxury-india',
    'wellness-retreat-transform-mind-body',
    'chef-secrets-indian-cuisine',
    'best-places-visit-india-winter',
    'sustainable-luxury-hotel-stays',
    'indian-festivals-guide',
    'yoga-meditation-retreat-benefits',
    'fine-dining-etiquette-guide',
    'hidden-gems-mumbai',
    'ayurveda-wellness',
    'indian-art-architecture',
    'honeymoon-india-romantic'
  ];

  // Generate XML Schema
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Append static pages
  staticPaths.forEach((path) => {
    const priority = path === '' ? '1.0' : '0.8';
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${path}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Append dynamic rooms
  rooms.forEach((room) => {
    const lastMod = room.updatedAt ? new Date(room.updatedAt).toISOString() : new Date().toISOString();
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/rooms/${room.id}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  // Append dynamic dining
  restaurants.forEach((rest) => {
    const lastMod = rest.updatedAt ? new Date(rest.updatedAt).toISOString() : new Date().toISOString();
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/dining/${rest.id}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  // Append dynamic blogs
  posts.forEach((post) => {
    const lastMod = post.updatedAt ? new Date(post.updatedAt).toISOString() : 
                    post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString();
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/journal/${post.slug}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;
  });

  // Append static fallback blogs
  staticBlogs.forEach((slug) => {
    const url = `${baseUrl}/journal/${slug}`;
    if (!posts.some((p) => `${baseUrl}/journal/${p.slug}` === url)) {
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    }
  });

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
