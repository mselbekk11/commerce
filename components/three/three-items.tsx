import { getCollectionProducts } from 'lib/shopify';
import { ThreeItemGridClient } from './three-items-client';

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
    <ThreeItemGridClient
      products={[firstProduct, secondProduct, thirdProduct, fourthProduct]}
    />
  );
}
