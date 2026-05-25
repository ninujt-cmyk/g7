import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Our Legacy, Vision & Hospitality Heritage - G7 Hotels',
  description: 'Learn about G7 Hotels\' journey of redefining luxury hospitality. Discover our core values, premium services, and sustainable operations in Srikalahasti and Tirupati.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
