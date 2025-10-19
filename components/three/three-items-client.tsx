'use client';

import { GridTileImage } from 'components/three/tile';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import { useState } from 'react';

function ThreeItemGridItem({
  item,
  priority,
  index,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  item: Product;
  priority?: boolean;
  index: number;
  hoveredIndex: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  const shouldBlur = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <div
      className=''
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
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
          shouldBlur={shouldBlur}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGridClient({ products }: { products: Product[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!products[0] || !products[1] || !products[2] || !products[3])
    return null;

  const [firstProduct, secondProduct, thirdProduct, fourthProduct] = products;

  return (
    <section className='mx-auto grid gap-4 px-4 py-4 md:grid-cols-4 max-w-7xl'>
      <ThreeItemGridItem
        item={firstProduct}
        priority={true}
        index={0}
        hoveredIndex={hoveredIndex}
        onHover={setHoveredIndex}
        onLeave={() => setHoveredIndex(null)}
      />
      <ThreeItemGridItem
        item={secondProduct}
        priority={true}
        index={1}
        hoveredIndex={hoveredIndex}
        onHover={setHoveredIndex}
        onLeave={() => setHoveredIndex(null)}
      />
      <ThreeItemGridItem
        item={thirdProduct}
        index={2}
        hoveredIndex={hoveredIndex}
        onHover={setHoveredIndex}
        onLeave={() => setHoveredIndex(null)}
      />
      <ThreeItemGridItem
        item={fourthProduct}
        index={3}
        hoveredIndex={hoveredIndex}
        onHover={setHoveredIndex}
        onLeave={() => setHoveredIndex(null)}
      />
    </section>
  );
}
