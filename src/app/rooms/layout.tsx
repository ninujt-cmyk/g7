import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Rooms, Suites & Villas | Accommodations - G7 Hotels',
  description: 'View our premium selection of luxury rooms and suites in Tirupati & Srikalahasti. Enjoy opulent amenities, custom linens, and 24/7 personalized service.',
};

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
