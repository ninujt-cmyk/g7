import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create a G7 Club Account | Register for Loyalty Rewards',
  description: 'Sign up for the G7 Club today to start earning rewards, access member-only room discounts, and receive tailored luxury travel benefits.',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
