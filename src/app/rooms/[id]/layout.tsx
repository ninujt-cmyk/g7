import type { Metadata } from 'next';
import { db } from '@/lib/db';

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const room = await db.room.findUnique({
      where: { id },
    });

    if (room) {
      // Transform view name to lowercase/capitalized for clean look
      const viewStr = room.view ? `${room.view.charAt(0) + room.view.slice(1).toLowerCase()} View` : '';
      const roomTypeStr = room.type ? `${room.type.charAt(0) + room.type.slice(1).toLowerCase()} Room` : '';

      return {
        title: `${room.name} | G7 Hotels Luxury Suite & Villa`,
        description: `${room.shortDescription || room.description} Enjoy premium luxury in Srikalahasti & Tirupati. Size: ${room.size} sq ft. ${viewStr}. ${roomTypeStr}. Book your stay today!`,
        openGraph: {
          title: `${room.name} - G7 Hotels Luxury Suite`,
          description: room.shortDescription || room.description,
          type: 'website',
        }
      };
    }
  } catch (error) {
    console.error('Error generating room metadata:', error);
  }

  return {
    title: 'Luxury Suite & Villa | G7 Hotels',
    description: 'Experience pure luxury and heritage comfort in our premium suites and rooms at G7 Hotels in Srikalahasti & Tirupati.',
  };
}

export default function RoomDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
