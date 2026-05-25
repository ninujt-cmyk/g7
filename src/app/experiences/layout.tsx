import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curated Travel & Heritage Experiences | G7 Hotels',
  description: 'Immerse yourself in Srikalahasti and Tirupati\'s rich cultural heritage. Enjoy guided temple tours, local artisan visits, and culinary masterclasses.',
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
