import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Directions | G7 Hotels Tirupati & Srikalahasti',
  description: 'Contact the G7 Hotels concierge desk. Get phone numbers, emails, addresses, and driving directions to our properties in Tirupati and Srikalahasti (near Merlapaka Toll Plaza).',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
