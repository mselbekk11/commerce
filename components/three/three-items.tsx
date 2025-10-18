import { GridTileImage } from 'components/three/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  priority,
}: {
  item: Product;
  priority?: boolean;
}) {
  return (
    <div className=''>
      <Link
        className='relative block h-full w-full'
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          priority={priority}
          alt={item.title}
          label={{
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items',
  });

  if (
    !homepageItems[0] ||
    !homepageItems[1] ||
    !homepageItems[2] ||
    !homepageItems[3]
  )
    return null;

  const [firstProduct, secondProduct, thirdProduct, fourthProduct] =
    homepageItems;

  return (
    <section className='mx-auto grid gap-4 px-4 py-4 md:grid-cols-4 max-w-7xl'>
      <ThreeItemGridItem item={firstProduct} priority={true} />
      <ThreeItemGridItem item={secondProduct} priority={true} />
      <ThreeItemGridItem item={thirdProduct} />
      <ThreeItemGridItem item={fourthProduct} />
    </section>
  );
}
