import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Reservation Policies - G7 Hotels',
  description: 'Review the official Terms and Conditions of G7 Hotels, covering booking guidelines, cancellation policies, and guest code of conduct.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
