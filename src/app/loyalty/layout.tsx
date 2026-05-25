import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'G7 Club | Elite Rewards & Luxury Loyalty Program - G7 Hotels',
  description: 'Join G7 Club and unlock a world of elite privileges, including complimentary room upgrades, late checkout, spa credits, and rewards points on every spend at G7 Hotels.',
};

export default function LoyaltyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
