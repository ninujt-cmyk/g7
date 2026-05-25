import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery | Virtual Tour of G7 Hotels Luxury Suites',
  description: 'Browse our photo gallery to view beautiful interiors, luxury rooms, fine dining spaces, wellness spas, and vibrant event venues at G7 Hotels.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
