import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | FAQ & Travel Help - G7 Hotels',
  description: 'Find answers to common questions about check-in/out times, booking modifications, spa appointments, fine dining reservations, and hotel policies at G7 Hotels.',
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
