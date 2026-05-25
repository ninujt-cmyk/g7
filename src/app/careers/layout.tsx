import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers in Luxury Hospitality | Join Our Team - G7 Hotels',
  description: 'Join G7 Hotels and build a stellar career in luxury hospitality. Explore job openings in guest relations, culinary arts, spa therapy, and management in Tirupati & Srikalahasti.',
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
