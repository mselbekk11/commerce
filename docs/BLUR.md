# Hover Blur Effect Documentation

## Overview

This document explains the hover blur effect implementation for the three-item grid on the homepage. When hovering over one of the four featured items, the other three items blur to create a focus effect.

## How It Works

The implementation uses React state management and conditional CSS classes to create the blur effect:

### Architecture

The feature is split across two components following Next.js 13+ App Router patterns:

1. **Server Component** ([components/three/three-items.tsx](../components/three/three-items.tsx))
   - Fetches product data from Shopify
   - Passes data to the client component

2. **Client Component** ([components/three/three-items-client.tsx](../components/three/three-items-client.tsx))
   - Manages hover state using `useState`
   - Handles mouse events
   - Applies blur effect

### State Management

```typescript
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
```

- `hoveredIndex` tracks which item (0-3) is currently being hovered
- When `null`, no item is hovered
- When a number, that item is focused and others are blurred

### Blur Logic

Each item calculates whether it should be blurred:

```typescript
const shouldBlur = hoveredIndex !== null && hoveredIndex !== index;
```

This evaluates to `true` when:
- An item IS being hovered (`hoveredIndex !== null`)
- AND it's NOT the current item (`hoveredIndex !== index`)

### CSS Implementation

The blur effect is applied in [components/three/tile.tsx](../components/three/tile.tsx):

```typescript
className={clsx('h-full w-full object-cover', {
  'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
  'blur-sm': shouldBlur,
})}
```

The `blur-sm` Tailwind class applies a subtle blur filter when `shouldBlur` is true.

## Files Modified

1. [components/three/three-items.tsx](../components/three/three-items.tsx) - Server component for data fetching
2. [components/three/three-items-client.tsx](../components/three/three-items-client.tsx) - Client component with hover logic (new file)
3. [components/three/tile.tsx](../components/three/tile.tsx) - Added `shouldBlur` prop

## How to Revert

If you want to remove the blur effect and restore the original behavior, follow these steps:

### Step 1: Restore `three-items.tsx`

Replace the contents of [components/three/three-items.tsx](../components/three/three-items.tsx) with:

```tsx
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
```

### Step 2: Delete the client component file

```bash
rm components/three/three-items-client.tsx
```

### Step 3: Restore `tile.tsx`

In [components/three/tile.tsx](../components/three/tile.tsx), remove the `shouldBlur` prop:

**Remove this:**
```tsx
shouldBlur?: boolean;
```

**And remove this:**
```tsx
'blur-sm': shouldBlur,
```

The final `GridTileImage` component should look like:

```tsx
export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div className='flex w-full flex-col'>
      <div
        className={clsx(
          'group relative aspect-square w-full overflow-hidden border dark:bg-black',
          {
            'border-2 border-blue-600': active,
            'border-neutral-200 dark:border-neutral-800': !active,
          }
        )}
      >
        {props.src ? (
          <Image
            className={clsx('h-full w-full object-cover', {
              'transition duration-300 ease-in-out group-hover:scale-105':
                isInteractive,
            })}
            {...props}
          />
        ) : null}
      </div>
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
        />
      ) : null}
    </div>
  );
}
```

### Step 4: Verify

After making these changes, the three-item grid will return to its original behavior without the hover blur effect.

## Customization Options

If you want to keep the feature but customize it:

### Change blur intensity

In [components/three/tile.tsx](../components/three/tile.tsx), replace `blur-sm` with:
- `blur-xs` - Extra subtle blur
- `blur` - Medium blur
- `blur-md` - More pronounced blur
- `blur-lg` - Strong blur

### Add transition effects

To make the blur transition smoother, add the transition classes:

```tsx
'blur-sm': shouldBlur,
'transition-all duration-300': true,
```

### Change which items blur

Currently, when hovering one item, the other three blur. To reverse this (blur only the hovered item), change the logic in [components/three/three-items-client.tsx](../components/three/three-items-client.tsx):

```tsx
const shouldBlur = hoveredIndex !== null && hoveredIndex === index;
```
