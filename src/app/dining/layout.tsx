import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fine Dining & Luxury Restaurants | G7 Hotels Gourmet Dining',
  description: 'Discover award-winning fine dining restaurants at G7 Hotels. Enjoy modern European cuisine, authentic Indian delicacies, and masterfully grilled selections.',
};

export default function DiningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
