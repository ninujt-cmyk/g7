import type { Metadata } from 'next';
import { db } from '@/lib/db';

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const restaurant = await db.restaurant.findUnique({
      where: { id },
    });

    if (restaurant) {
      // Parse cuisines if it is a JSON string
      let cuisinesStr = '';
      try {
        const cuisines = JSON.parse(restaurant.cuisine || '[]');
        if (Array.isArray(cuisines) && cuisines.length > 0) {
          cuisinesStr = ` featuring ${cuisines.join(', ')} culinary specialties`;
        }
      } catch {
        if (restaurant.cuisine) {
          cuisinesStr = ` featuring ${restaurant.cuisine}`;
        }
      }

      return {
        title: `${restaurant.name} | Fine Dining & Gourmet Restaurant - G7 Hotels`,
        description: `${restaurant.shortDescription || restaurant.description} Indulge in gourmet fine dining at G7 Hotels${cuisinesStr}. Book your table online today!`,
        openGraph: {
          title: `${restaurant.name} Fine Dining - G7 Hotels`,
          description: restaurant.shortDescription || restaurant.description,
          type: 'website',
        }
      };
    }
  } catch (error) {
    console.error('Error generating restaurant metadata:', error);
  }

  return {
    title: 'Gourmet Fine Dining | G7 Hotels',
    description: 'Indulge in award-winning culinary delights, fine dining, and exquisite menus at G7 Hotels in Tirupati and Srikalahasti.',
  };
}

export default function RestaurantDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
