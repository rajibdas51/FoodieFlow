import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/provider/ReduxProvider';

const geistSans = Geist({
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
});

export const metadata = {
  title: 'FoodieFlow - Your Food Ordering Companion',
  description:
    'Order your favorite meals effortlessly with FoodieFlow. A seamless food ordering app built with Next.js, Node.js, and MongoDB.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
