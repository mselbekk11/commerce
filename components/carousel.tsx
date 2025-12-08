import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './three/tile';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({
    collection: 'hidden-homepage-carousel',
  });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products];

  return (
    <div className='w-full overflow-x-auto py-4 pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
      <ul className='flex animate-carousel gap-4'>
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className='relative w-1/2 max-w-[320px] flex-none md:w-1/4'
          >
            <Link
              href={`/product/${product.handle}`}
              className='relative h-full w-full'
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
