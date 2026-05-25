import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guest Login | G7 Club Loyalty Program Portal - G7 Hotels',
  description: 'Log in to your G7 Club member account to view active rewards, redeem loyalty points, and book stays with exclusive member rates.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
