import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ayurvedic Spa & Wellness Center | Rejuvenate at G7 Hotels',
  description: 'Experience deep relaxation at G7 Hotels\' spa. Indulge in traditional Ayurvedic massages, soothing facials, body wraps, and holistic wellness therapies in Tirupati & Srikalahasti.',
};

export default function SpaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
