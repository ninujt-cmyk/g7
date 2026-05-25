import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exclusive Hotel Deals, Dining & Spa Offers | G7 Hotels',
  description: 'Discover our handpicked packages and seasonal offers. Save on luxury accommodations, romantic getaways, spa treatments, and gourmet dining experiences at G7 Hotels.',
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
