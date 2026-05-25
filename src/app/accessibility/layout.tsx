import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Inclusive Luxury Stays - G7 Hotels',
  description: 'G7 Hotels is dedicated to offering a comfortable and fully accessible experience for all our guests. Learn more about our digital and physical accessibility features.',
};

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
