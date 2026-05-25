import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press Room | Media Kit & Latest News Updates - G7 Hotels',
  description: 'Read the latest press releases, media coverage, and corporate announcements from G7 Hotels\' luxury hospitality group in Andhra Pradesh.',
};

export default function PressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
