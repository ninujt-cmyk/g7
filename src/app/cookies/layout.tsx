import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Privacy & Experience Optimization - G7 Hotels',
  description: 'Read G7 Hotels\' Cookie Policy to understand how we use cookies to personalize your browsing experience and improve our services.',
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
