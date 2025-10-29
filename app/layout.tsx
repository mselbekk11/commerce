import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
// import { WelcomeToast } from 'components/welcome-toast';
import { Analytics } from '@vercel/analytics/next';
import { GeistMono } from 'geist/font/mono';
import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import Script from 'next/script';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang='en' className={`${GeistMono.variable}`}>
      <body className='bg-neutral-50 text-black selection:bg-black selection:text-white dark:bg-neutral-900 dark:text-white'>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            {/* <WelcomeToast /> */}
          </main>
        </CartProvider>
        <Analytics />
      </body>
      <Script src='https://scripts.simpleanalyticscdn.com/latest.js' />
    </html>
  );
}
