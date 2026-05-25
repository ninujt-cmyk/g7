import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The G7 Journal | Luxury Travel, Wellness & Heritage Blog',
  description: 'Explore curated articles on travel tips, wellness retreats, cooking secrets from our executive chefs, and the cultural heritage of Srikalahasti and Tirupati.',
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
