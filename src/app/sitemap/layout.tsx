import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Site Map | Quick Navigation Guide - G7 Hotels',
  description: 'Navigate all pages of G7 Hotels easily using our comprehensive HTML site map. Find rooms, dining, spa, events, journal, and policy pages.',
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
