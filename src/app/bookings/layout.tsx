import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Reservations | Guest Reservation Portal - G7 Hotels',
  description: 'Access and manage your active bookings, view invoices, edit stay details, or select room preferences at G7 Hotels.',
};

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
