import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection Commitment - G7 Hotels',
  description: 'Your privacy is our priority. Read the G7 Hotels Privacy Policy to learn how we protect, handle, and secure your personal information.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
