import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/three/three-items';
import Hero from 'components/hero/hero';
import Footer from 'components/layout/footer';
import Section from 'components/hero/section';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <ThreeItemGrid /> */}
      <Section />
      <Carousel />
      <Footer />
    </>
  );
}
