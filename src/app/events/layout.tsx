import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Venues, Corporate Events & Weddings - G7 Hotels',
  description: 'Host your dream wedding, corporate gala, or private celebration in G7 Hotels\' grand banquet halls and open-air venues in Tirupati & Srikalahasti.',
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
