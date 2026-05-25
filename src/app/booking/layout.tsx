import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Luxury Stay | Best Rate Guarantee - G7 Hotels',
  description: 'Reserve your luxury room, suite, or dining table at G7 Hotels online. Enjoy exclusive benefits, early check-in, and complimentary gourmet breakfast in Tirupati & Srikalahasti.',
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
