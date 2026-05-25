import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews & Feedback Policy | Guest Trust Guidelines - G7 Hotels',
  description: 'Learn about G7 Hotels\' guidelines for guest reviews, feedback verification, and our dedication to transparency and quality control.',
};

export default function ReviewsPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
