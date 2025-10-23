'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { useState } from 'react';
import { AIAssistantPanel } from './ai-assistant-panel';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <>
      <div className='mb-6 flex items-baseline justify-between border-b pb-2 dark:border-neutral-700'>
        <h1 className='mb-2 text-lg font-medium'>{product.title}</h1>
        <div className='text-lg font-medium text-black dark:text-white'>
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>

      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className='mb-6 text-sm leading-tight dark:text-white/[60%]'
          html={product.descriptionHtml}
        />
      ) : null}

      {/* AI Assistant Trigger Button */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <AddToCart product={product} />
        <button
          onClick={() => setIsAssistantOpen(true)}
          className='w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-black text-black hover:bg-gray-50 dark:hover:bg-blue-950 rounded-lg transition-colors font-medium text-sm'
        >
          <SparklesIcon className='h-5 w-5' />
          Ask AI 
        </button>
      </div>

      {/* AI Assistant Side Panel */}
      <AIAssistantPanel
        product={product}
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </>
  );
}
