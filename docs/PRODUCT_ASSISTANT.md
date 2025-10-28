# AI Product Assistant - Implementation Guide

**Feature:** Side Panel AI Chatbot with Vercel AI SDK
**Timeline:** 4-6 hours
**Tech Stack:** Vercel AI SDK, OpenAI GPT-4, Next.js App Router

---

## Overview

This guide walks you through implementing an AI product assistant that:
- Opens in a **side panel** (70% product page / 30% chat panel)
- Appears when user clicks **"Learn About Product"** button
- Has **full product context** (title, description, price, variants, materials, etc.)
- Uses **Vercel AI SDK Elements** for professional UI components
- **Streams responses** in real-time for better UX

---

## Architecture Overview

### How Product Context Works

The chatbot will receive product context in **two ways**:

1. **System Prompt (Backend)** - Product data is injected into the AI's system instructions
2. **Initial Context Message** - First "system" message contains structured product data

**Flow:**
```
User clicks "Learn About Product"
  �
Side panel opens with chat interface
  �
Frontend sends product data + user message to API
  �
Backend injects product context into AI system prompt
  �
AI streams response with full product knowledge
  �
User sees real-time streamed answer
```

**Why this approach?**
- AI has immediate access to all product details
- No need to "read" the DOM or scrape the page
- Type-safe product data passed from server
- More reliable than web scraping

---

## Step-by-Step Implementation

### Step 1: Install Dependencies (5 minutes)

```bash
# Install Vercel AI SDK and OpenAI provider
pnpm add ai @ai-sdk/openai

# AI SDK Elements are included in 'ai' package (no separate install needed)
```

**What we're installing:**
- `ai` - Vercel AI SDK with `useChat` hook and streaming utilities
- `@ai-sdk/openai` - OpenAI provider for GPT-4

---

### Step 2: Set Up Environment Variables (2 minutes)

Add your OpenAI API key to `.env.local`:

```bash
# .env.local
OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Get your key:** https://platform.openai.com/api-keys

**Alternative:** You can also use Anthropic Claude instead:
```bash
pnpm add @ai-sdk/anthropic
ANTHROPIC_API_KEY=sk-ant-your-key
```

---

### Step 3: Create the API Route (30-45 minutes)

Create a new API route handler that will process chat messages and stream AI responses.

**File:** `app/api/product-chat/route.ts`

```typescript
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { NextRequest } from 'next/server';

// Allow streaming for up to 30 seconds
export const maxDuration = 30;

// Type for product context
interface ProductContext {
  id: string;
  title: string;
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  variants: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  }>;
  availableForSale: boolean;
  tags: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, productContext }: {
      messages: UIMessage[];
      productContext: ProductContext;
    } = body;

    // Build a comprehensive system prompt with product knowledge
    const systemPrompt = `You are an expert product assistant for an e-commerce store. You help customers understand products, answer questions about sizing, materials, availability, and make recommendations.

PRODUCT INFORMATION:
- Title: ${productContext.title}
- Description: ${productContext.description}
- Price: ${productContext.price.amount} ${productContext.price.currencyCode}
- Available for Sale: ${productContext.availableForSale ? 'Yes' : 'No'}
- Product ID: ${productContext.id}

AVAILABLE VARIANTS:
${productContext.variants.map((variant, idx) => `
  ${idx + 1}. ${variant.title}
     - Available: ${variant.availableForSale ? 'Yes' : 'No'}
     - Options: ${variant.selectedOptions.map(opt => `${opt.name}: ${opt.value}`).join(', ')}
`).join('\n')}

PRODUCT TAGS: ${productContext.tags.join(', ')}

INSTRUCTIONS:
- Answer questions specifically about this product
- Be helpful, friendly, and concise
- If asked about sizing, explain available variants
- If the product is unavailable, suggest checking back later
- Don't make up information - only use the product data provided
- Keep responses under 3-4 sentences unless more detail is requested
- Use a conversational, helpful tone
`;

    // Stream the AI response
    const result = streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      temperature: 0.7,
      maxTokens: 500,
    });

    // Return streaming response
    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Product chat API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
```

**Key Points:**
- **`systemPrompt`** - Contains ALL product context, injected into AI's system instructions
- **`streamText()`** - Enables real-time streaming responses
- **`toDataStreamResponse()`** - Returns data in Vercel AI SDK format
- **`temperature: 0.7`** - Balanced creativity (0 = factual, 1 = creative)
- **`maxTokens: 500`** - Limits response length (cost control)

---

### Step 4: Create the Side Panel Component (60-90 minutes)

Create a sliding side panel using **Headless UI Dialog** - the same pattern as the cart modal.

**Why Headless UI Dialog?**
- ✅ **Consistent with existing code** - Matches [components/cart/modal.tsx](../components/cart/modal.tsx) pattern
- ✅ **Built-in accessibility** - Focus management, ESC key handling, ARIA attributes
- ✅ **Smooth transitions** - `Transition.Child` for professional animations
- ✅ **Less code** - No manual backdrop/panel management
- ✅ **Production-ready** - Already installed and battle-tested

**File:** `components/product/ai-assistant-panel.tsx`

```typescript
'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useChat } from 'ai/react';
import { Product } from 'lib/shopify/types';
import { Fragment, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface AIAssistantPanelProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistantPanel({ product, isOpen, onClose }: AIAssistantPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Prepare product context for the AI
  const productContext = {
    id: product.id,
    title: product.title,
    description: product.description,
    price: {
      amount: product.priceRange.maxVariantPrice.amount,
      currencyCode: product.priceRange.maxVariantPrice.currencyCode,
    },
    variants: product.variants.map(v => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      selectedOptions: v.selectedOptions,
    })),
    availableForSale: product.availableForSale,
    tags: product.tags,
  };

  // Initialize Vercel AI SDK's useChat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/product-chat',
    body: {
      productContext, // Send product context with every request
    },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hi! I'm here to help you learn about **${product.title}**. Feel free to ask me anything about sizing, materials, availability, or any other questions you might have!`,
      },
    ],
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Transition show={isOpen}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop - uses Transition.Child for smooth fade */}
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-[.5px]"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="opacity-100 backdrop-blur-[.5px]"
          leaveTo="opacity-0 backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        {/* Side Panel - slides in from right */}
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[450px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <Dialog.Title className="text-lg font-semibold">
                  Product Assistant
                </Dialog.Title>
              </div>
              <button
                onClick={onClose}
                className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                aria-label="Close assistant"
              >
                <XMarkIcon className="h-6 transition-all ease-in-out hover:scale-110" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={clsx(
                  'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                )}
              >
                {/* Render message content with markdown support */}
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {message.content}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-2.5">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg px-4 py-3 text-sm">
              Sorry, something went wrong. Please try again.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about this product..."
              className={clsx(
                'flex-1 px-4 py-2.5 rounded-lg',
                'bg-neutral-100 dark:bg-neutral-800',
                'border border-neutral-200 dark:border-neutral-700',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'text-sm placeholder:text-neutral-500',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={clsx(
                'px-4 py-2.5 rounded-lg',
                'bg-blue-600 hover:bg-blue-700',
                'text-white font-medium text-sm',
                'transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'flex items-center gap-2'
              )}
            >
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </form>

          {/* Quick prompts (optional) */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              'What sizes are available?',
              'Tell me about the materials',
              'Is this in stock?',
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  handleInputChange({ target: { value: prompt } } as any);
                  // Auto-submit after a short delay
                  setTimeout(() => {
                    const form = document.querySelector('form');
                    form?.requestSubmit();
                  }, 100);
                }}
                className="px-3 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors"
                disabled={isLoading}
              >
                {prompt}
              </button>
            ))}
          </div>
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  </Transition>
  );
}
```

**Key Features:**
- **Headless UI Dialog** - Same pattern as cart modal for consistency
- **Transition.Child** - Smooth slide-in/fade animations
- **Dialog.Title & Dialog.Panel** - Semantic HTML with accessibility
- **`useChat` hook** - Manages messages, input, and streaming state
- **`productContext`** - Product data sent to API with every message
- **`initialMessages`** - Welcome message when panel opens
- **Auto-scroll** - Messages auto-scroll to bottom
- **Quick prompts** - Pre-defined questions for better UX
- **Loading states** - Animated dots while AI responds
- **Responsive** - Full width on mobile, 450px on desktop
- **Built-in accessibility** - ESC to close, focus management, ARIA attributes

---

### Step 5: Add Trigger Button to Product Page (20-30 minutes)

Modify the product description component to include the "Learn About Product" button.

**File:** `components/product/product-description.tsx`

```typescript
'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
import { AIAssistantPanel } from './ai-assistant-panel';
import { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

export function ProductDescription({ product }: { product: Product }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <>
      <div className='mb-6 flex items-baseline justify-between border-b pb-2 dark:border-neutral-700'>
        <h1 className='mb-2 text-lg font-medium'>{product.title}</h1>
        <div className='text-lg font-medium text-black'>
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
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="mb-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors font-medium text-sm"
      >
        <SparklesIcon className="h-5 w-5" />
        Ask AI About This Product
      </button>

      <AddToCart product={product} />

      {/* AI Assistant Side Panel */}
      <AIAssistantPanel
        product={product}
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </>
  );
}
```

**What Changed:**
- Added `'use client'` directive (required for `useState`)
- Import `AIAssistantPanel` component
- Import `SparklesIcon` for visual appeal
- Added `isAssistantOpen` state
- Added trigger button above "Add to Cart"
- Render `AIAssistantPanel` with open/close handlers

---

### Step 6: Update Product Page to Support Client Components (5 minutes)

Since `ProductDescription` is now a Client Component, we need to ensure the product page handles this correctly.

**File:** `app/product/[handle]/page.tsx`

The current implementation already wraps `ProductDescription` in a `Suspense` boundary, which is perfect! No changes needed here. The product data is fetched server-side and passed as props to the client component.

**Current code (already correct):**
```typescript
<div className='basis-full lg:basis-3/6'>
  <Suspense fallback={null}>
    <ProductDescription product={product} />
  </Suspense>
</div>
```

---

### Step 7: Layout Adjustment for 70/30 Split (10 minutes)

To achieve the 70% / 30% viewport split when the panel is open, we'll use CSS positioning. The current implementation already handles this correctly with:

- **Side panel:** `fixed right-0` with `w-full md:w-[400px] lg:w-[450px]`
- **Main content:** Remains unchanged (automatically adjusts when panel slides in)
- **Backdrop:** Semi-transparent overlay to dim the main content

**On Desktop:**
- Panel is 400-450px wide (~30% on 1440px+ screens)
- Main content is pushed to the left visually by the overlay

**On Mobile:**
- Panel is full width
- Main content is hidden behind overlay

**Already implemented in Step 4!** No additional changes needed.

---

### Step 8: Testing Your Implementation (15-20 minutes)

#### 8.1 Start Development Server

```bash
pnpm dev
```

#### 8.2 Navigate to Any Product Page

```
http://localhost:3000/product/acme-cup
```

#### 8.3 Test Checklist

- [ ] Click "Ask AI About This Product" button
- [ ] Side panel slides in from the right
- [ ] Welcome message appears
- [ ] Try typing a question: "What sizes are available?"
- [ ] AI response streams in real-time
- [ ] Click quick prompt buttons
- [ ] Verify product-specific answers (title, price, variants)
- [ ] Test on mobile (full-width panel)
- [ ] Close panel with X button
- [ ] Close panel by clicking backdrop

#### 8.4 Common Issues & Fixes

**Issue:** API returns 500 error
**Fix:** Check `.env.local` has valid `OPENAI_API_KEY`

**Issue:** Panel doesn't slide in
**Fix:** Verify `isOpen` state is being set to `true`

**Issue:** Messages don't scroll
**Fix:** Check `messagesEndRef` is attached to scroll div

**Issue:** AI gives generic answers (not product-specific)
**Fix:** Verify `productContext` is being sent in `useChat` body

---

## Advanced Enhancements (Optional)

### Enhancement 1: Markdown Rendering

Install and use `react-markdown` for better formatting:

```bash
pnpm add react-markdown
```

```typescript
import ReactMarkdown from 'react-markdown';

// In message rendering:
<ReactMarkdown className="prose prose-sm dark:prose-invert">
  {message.content}
</ReactMarkdown>
```

### Enhancement 2: Persistent Chat History

Use localStorage to save chat history:

```typescript
useEffect(() => {
  if (messages.length > 1) {
    localStorage.setItem(`chat-${product.id}`, JSON.stringify(messages));
  }
}, [messages, product.id]);

// On mount, restore history
useEffect(() => {
  const saved = localStorage.getItem(`chat-${product.id}`);
  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, [product.id]);
```

### Enhancement 3: Related Product Recommendations

Update the system prompt to enable recommendations:

```typescript
const systemPrompt = `...
If the customer asks for recommendations, you can suggest related products from these tags: ${productContext.tags.join(', ')}
...`;
```

### Enhancement 4: Multi-language Support

Add language detection and translation:

```typescript
const systemPrompt = `...
Detect the user's language and respond in that language.
...`;
```

### Enhancement 5: Analytics Tracking

Track chat interactions:

```typescript
useEffect(() => {
  if (isOpen) {
    // Track panel open
    window.gtag?.('event', 'ai_assistant_opened', {
      product_id: product.id,
      product_title: product.title,
    });
  }
}, [isOpen]);
```

---

## AI SDK Elements Components (Future Enhancement)

Currently, we're using custom components. If you want to use AI SDK Elements in the future:

### Option 1: Use Built-in Components

```typescript
import { Message, MessageList, ChatInput } from 'ai/react/elements';

// In your component:
<MessageList messages={messages} />
<ChatInput
  value={input}
  onChange={handleInputChange}
  onSubmit={handleSubmit}
/>
```

### Option 2: Customize Elements

```typescript
import { Message } from 'ai/react/elements';

<Message
  message={message}
  className="my-custom-class"
  renderContent={(content) => <CustomContent>{content}</CustomContent>}
/>
```

**Note:** AI SDK Elements are still evolving. The custom implementation in this guide gives you more control and is production-ready.

---

## Performance Considerations

### 1. API Route Optimization

**Current:** Each request sends full product context
**Optimization:** Cache product context server-side

```typescript
// Use Next.js cache
import { unstable_cache } from 'next/cache';

const getCachedProduct = unstable_cache(
  async (productId: string) => getProduct(productId),
  ['product-cache'],
  { revalidate: 3600 }
);
```

### 2. Streaming Token Limits

**Current:** `maxTokens: 500` per response
**Recommendation:** Adjust based on use case
- Short answers: 300 tokens
- Detailed explanations: 800 tokens
- Cost vs quality trade-off

### 3. Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// app/api/product-chat/route.ts
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export async function POST(req: NextRequest) {
  const ip = req.ip ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  // ... rest of handler
}
```

---

## Cost Estimation

### OpenAI GPT-4 Pricing (as of October 2025)

**Model:** GPT-4o
- Input: $2.50 / 1M tokens
- Output: $10.00 / 1M tokens

**Average conversation:**
- System prompt: ~300 tokens
- User message: ~20 tokens
- AI response: ~150 tokens
- **Total per exchange:** ~470 tokens

**Cost per conversation (5 exchanges):**
- Input: (300 + 20*5) = 400 tokens = $0.001
- Output: 150*5 = 750 tokens = $0.0075
- **Total: ~$0.009 per conversation**

**Monthly estimate (1000 products, 100 conversations each):**
- 100,000 conversations � $0.009 = **$900/month**

**Optimization tips:**
1. Use GPT-4o-mini ($0.15/$0.60 per 1M tokens) = **10x cheaper**
2. Reduce system prompt length
3. Implement caching for common questions
4. Add rate limiting

---

## Troubleshooting Guide

### Error: "OpenAI API key not found"

**Solution:**
```bash
# Check .env.local
cat .env.local | grep OPENAI_API_KEY

# Restart dev server
pnpm dev
```

### Error: "Module not found: 'ai'"

**Solution:**
```bash
pnpm add ai @ai-sdk/openai
```

### Panel doesn't open

**Solution:**
```typescript
// Add console.log to debug
const [isAssistantOpen, setIsAssistantOpen] = useState(false);

console.log('Panel open:', isAssistantOpen); // Should toggle true/false
```

### AI gives wrong product information

**Solution:**
```typescript
// Verify productContext in API route
console.log('Product context:', productContext);

// Should show correct title, price, variants
```

### Streaming doesn't work

**Solution:**
```typescript
// Ensure using toDataStreamResponse()
return result.toDataStreamResponse();

// NOT toTextStreamResponse()
```

---

## Demo Script for Interview

### Setup (Before Demo)

1. Navigate to product page
2. Have 3-4 test questions ready
3. Clear browser cache for fresh demo

### Demo Flow (3-5 minutes)

**1. Introduction (30 seconds)**
> "I've implemented an AI product assistant using Vercel's AI SDK. Let me show you how it works."

**2. Trigger Panel (15 seconds)**
> "When a customer wants to learn more, they click this button, and a side panel opens with an AI assistant that has full context about the product."

**3. Ask Question (30 seconds)**
> [Type: "What sizes are available?"]
> "Notice how the response streams in real-time, and the AI knows exactly what variants we have in stock."

**4. Follow-up (30 seconds)**
> [Type: "What material is this made from?"]
> "It can answer detailed questions by analyzing the product description and metadata."

**5. Quick Prompts (15 seconds)**
> "I've also added quick prompt buttons for common questions to improve UX."

**6. Technical Highlight (60 seconds)**
> "Under the hood, this uses Next.js App Router with a Route Handler that streams responses using Vercel's AI SDK. The product contexttitle, description, variants, pricingis injected into the AI's system prompt, so it has comprehensive knowledge without needing to scrape the page. This architecture ensures accurate, product-specific responses every time."

**7. Close (15 seconds)**
> "The panel is responsive, works on mobile, and integrates seamlessly with the existing Shopify product data."

---

## Next Steps After Implementation

### Immediate (Hours)

- [ ] Test on multiple product types
- [ ] Verify mobile responsiveness
- [ ] Test error handling (invalid API key, network errors)
- [ ] Add loading states

### Short-term (Days)

- [ ] Implement analytics tracking
- [ ] Add rate limiting
- [ ] Optimize system prompts
- [ ] A/B test button placement

### Long-term (Weeks)

- [ ] Train custom model on product catalog
- [ ] Add multi-language support
- [ ] Implement conversation history
- [ ] Build admin dashboard for monitoring

---

## Summary

### What You Built

 Real-time AI product assistant
 Side panel with 70/30 split layout
 Full product context awareness
 Streaming responses
 Mobile-responsive design
 Professional UI with quick prompts
 Error handling and loading states

### Key Technologies

- **Vercel AI SDK** - `useChat` hook, streaming
- **OpenAI GPT-4** - Natural language responses
- **Next.js 15** - App Router, Route Handlers
- **React 19** - Client Components, hooks
- **Tailwind CSS** - Styling and animations

### Interview Impact

**Technical Depth:** PPPPP
- Shows Vercel AI SDK mastery
- Demonstrates streaming architecture
- Type-safe product context passing
- Production-ready error handling

**Business Value:** PPPPP
- Improves customer experience
- Reduces support burden
- Increases conversion (informed buyers)
- Scalable architecture

**Demo Appeal:** PPPPP
- Visually impressive
- Interactive and engaging
- Real-time streaming is "wow" factor
- Shows Vercel ecosystem integration

---

**Estimated Total Time:** 4-6 hours
**Difficulty:** Intermediate
**Impact:** Very High

Good luck with your implementation! =�

---

## How It All Connects Together

This section explains the complete data flow from user click to AI response streaming.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  Product Page (app/product/[handle]/page.tsx)               │
│  ┌──────────────────────────────────────────────┐          │
│  │ Server Component                             │          │
│  │  - Fetches product data from Shopify         │          │
│  │  - Passes to ProductDescription as props     │          │
│  └──────────────────────────────────────────────┘          │
│                    ↓                                         │
│  ┌──────────────────────────────────────────────┐          │
│  │ ProductDescription (Client Component)        │          │
│  │  - 'use client' directive                    │          │
│  │  - Manages isAssistantOpen state             │          │
│  │  - Renders trigger button                    │          │
│  │  - Renders AIAssistantPanel                  │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  User clicks "Ask AI About This Product"                    │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  AIAssistantPanel Component                                  │
│  ┌──────────────────────────────────────────────┐          │
│  │ Headless UI Dialog (isOpen = true)           │          │
│  │  - <Transition> animates backdrop fade        │          │
│  │  - <Transition.Child> slides panel in         │          │
│  │  - <Dialog.Panel> contains chat UI            │          │
│  └──────────────────────────────────────────────┘          │
│                    ↓                                         │
│  ┌──────────────────────────────────────────────┐          │
│  │ useChat Hook (from ai/react)                 │          │
│  │  - api: '/api/product-chat'                  │          │
│  │  - body: { productContext }                  │          │
│  │  - initialMessages: welcome message          │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  User types message and clicks send                         │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  POST /api/product-chat                                     │
│  ┌──────────────────────────────────────────────┐          │
│  │ Route Handler (app/api/product-chat/route.ts)│          │
│  │  1. Receives: { messages, productContext }  │          │
│  │  2. Builds system prompt with product data  │          │
│  │  3. Calls streamText() with OpenAI GPT-4o   │          │
│  │  4. Returns toTextStreamResponse()          │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  OpenAI GPT-4o API                                          │
│  ┌──────────────────────────────────────────────┐          │
│  │ AI Model receives:                           │          │
│  │  - System: Product context (title, price,   │          │
│  │    description, variants, tags)              │          │
│  │  - Messages: Conversation history            │          │
│  │  - User: Current question                    │          │
│  │                                               │          │
│  │ AI generates product-specific answer         │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  Streaming Response                                          │
│  ┌──────────────────────────────────────────────┐          │
│  │ Response streams back to client in real-time │          │
│  │  - useChat hook receives chunks              │          │
│  │  - Updates messages array reactively         │          │
│  │  - UI renders each chunk as it arrives       │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  User sees AI response appear word-by-word                   │
│  - Auto-scrolls to bottom                                    │
│  - Can ask follow-up questions                               │
│  - Quick prompts available for common questions              │
└─────────────────────────────────────────────────────────────┘
```

### Complete File Structure

```
/Users/morgan/projects/vercel/commerce/
├── app/
│   ├── api/
│   │   └── product-chat/
│   │       └── route.ts ← API endpoint for AI chat
│   └── product/
│       └── [handle]/
│           └── page.tsx ← Fetches product from Shopify
├── components/
│   ├── cart/
│   │   └── modal.tsx ← Pattern we copied for Dialog
│   └── product/
│       ├── ai-assistant-panel.tsx ← NEW: Chat UI with Dialog
│       └── product-description.tsx ← MODIFIED: Added trigger button
└── lib/
    └── shopify/
        └── index.ts ← Shopify API integration
```

### Key Integration Points

#### 1. Server Component → Client Component
```typescript
// Server (app/product/[handle]/page.tsx)
const product = await getProduct(handle); // Shopify GraphQL

// Client (components/product/product-description.tsx)
'use client';
export function ProductDescription({ product }: { product: Product })
```

**Why this works:**
- Server fetches product data (no client-side API calls)
- Product serialized and sent to client as props
- Client component can use hooks and interactivity

#### 2. Client State → Dialog Animation
```typescript
// State management
const [isAssistantOpen, setIsAssistantOpen] = useState(false);

// Trigger
<button onClick={() => setIsAssistantOpen(true)}>

// Dialog listens to state
<Transition show={isOpen}>
  <Dialog onClose={onClose}>
```

**Why this works:**
- Single source of truth (`isAssistantOpen`)
- Headless UI handles animations automatically
- ESC key and backdrop click call `onClose()`

#### 3. Product Data → AI Context
```typescript
// Transform product for AI
const productContext = {
  id: product.id,
  title: product.title,
  description: product.description,
  // ... structured data
};

// Send with every message
useChat({
  body: { productContext }
})
```

**Why this works:**
- AI receives same data structure every time
- Type-safe transformation from Shopify → API
- No need to parse HTML or scrape DOM

#### 4. useChat Hook → API Route
```typescript
// Client
const { messages, input, handleSubmit } = useChat({
  api: '/api/product-chat',
  body: { productContext }
});

// API receives
export async function POST(req: NextRequest) {
  const { messages, productContext } = await req.json();
}
```

**Why this works:**
- useChat handles all HTTP logic
- Auto-manages message history
- Streams responses reactively

#### 5. API Route → OpenAI Streaming
```typescript
const systemPrompt = `
  Product: ${productContext.title}
  Price: ${productContext.price.amount}
  ...
`;

const result = streamText({
  model: openai('gpt-4o'),
  system: systemPrompt,
  messages: convertToCoreMessages(messages),
});

return result.toTextStreamResponse();
```

**Why this works:**
- System prompt gives AI full product knowledge
- `streamText()` enables token-by-token streaming
- `toTextStreamResponse()` pipes to client

#### 6. Streaming → UI Updates
```typescript
// useChat receives chunks automatically
{messages.map((message) => (
  <div>{message.content}</div> // Updates in real-time
))}

// Auto-scroll on new content
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);
```

**Why this works:**
- React re-renders on each chunk
- Messages array updates reactively
- Smooth UX with progressive rendering

### Troubleshooting Connection Points

| Issue | Check This | Fix This |
|-------|-----------|----------|
| **Panel doesn't open** | `isAssistantOpen` state | Verify `setIsAssistantOpen(true)` is called |
| **AI gives generic answers** | `productContext` in `useChat` body | Ensure product data is passed to API |
| **Streaming doesn't work** | API returns `toTextStreamResponse()` | Check `OPENAI_API_KEY` in `.env.local` |
| **Messages don't appear** | `messages` array rendering | Check console for React errors |
| **Panel doesn't close** | `onClose` function | Verify it calls `setIsAssistantOpen(false)` |
| **Slow responses** | OpenAI API latency | Consider using GPT-4o-mini |
| **Type errors** | `Product` type mismatch | Ensure product prop matches Shopify type |

### Data Flow Timeline

```
0ms   - User clicks button
50ms  - setState triggers re-render
100ms - Dialog.Transition begins animation
400ms - Panel fully visible
500ms - User types message
600ms - User clicks send
650ms - POST /api/product-chat sent
700ms - API route receives request
750ms - System prompt built with product data
800ms - OpenAI API called
1200ms - First token received (streaming begins)
1250ms - useChat receives first chunk
1300ms - UI renders first word
1350ms - Second chunk arrives
1400ms - UI updates with second word
...    - Streaming continues
3000ms - Full response complete
3050ms - Auto-scroll to bottom
```

### Why This Architecture is Production-Ready

1. **Type Safety Throughout**
   - Product: `Product` type from Shopify
   - Context: `ProductContext` interface
   - Messages: `UIMessage[]` from AI SDK

2. **Separation of Concerns**
   - Server: Data fetching (Shopify)
   - Client: UI state & interactivity
   - API: AI processing
   - External: OpenAI service

3. **Error Boundaries**
   - API route has try/catch
   - useChat exposes `error` state
   - UI displays error messages
   - Graceful degradation

4. **Performance Optimized**
   - Server-side product fetch (cached)
   - Minimal client-side JavaScript
   - Streaming prevents blocking
   - Only chat UI is interactive

5. **Accessibility Built-in**
   - Headless UI Dialog handles:
     - Focus trapping
     - ESC key support
     - ARIA attributes
     - Keyboard navigation

6. **Consistent with Codebase**
   - Same Dialog pattern as cart
   - Same Shopify fetch pattern
   - Same Tailwind styling
   - Same TypeScript conventions

---

**You now have a complete understanding of how every piece connects!** 🚀

The implementation is ready to demo and discuss in your interview. Good luck!
