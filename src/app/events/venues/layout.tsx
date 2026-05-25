import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exquisite Banquet Halls & Meeting Rooms | G7 Hotels Venues',
  description: 'Explore our state-of-the-art event venues, boardrooms, and outdoor lawns in Tirupati & Srikalahasti. View capacities, floor plans, and amenities for seamless events.',
};

export default function VenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
