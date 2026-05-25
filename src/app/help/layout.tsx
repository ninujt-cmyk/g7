import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guest Support & Customer Care | Help Center - G7 Hotels',
  description: 'Need assistance with your booking or stay? Contact the G7 Hotels customer support and concierge team for immediate help in Tirupati and Srikalahasti.',
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
