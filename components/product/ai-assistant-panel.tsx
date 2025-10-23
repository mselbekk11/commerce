'use client';

import { Dialog, Transition } from '@headlessui/react';
import {
  PaperAirplaneIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useChat } from 'ai/react';
import clsx from 'clsx';
import { Product } from 'lib/shopify/types';
import { Fragment, useEffect, useRef } from 'react';

interface AIAssistantPanelProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistantPanel({
  product,
  isOpen,
  onClose,
}: AIAssistantPanelProps) {
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
    variants: product.variants.map((v) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      selectedOptions: v.selectedOptions,
    })),
    availableForSale: product.availableForSale,
    tags: product.tags,
  };

  // Initialize Vercel AI SDK's useChat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: '/api/product-chat',
      body: {
        productContext, // Send product context with every request
      },
      initialMessages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: `Hi! I'm here to help you learn about ${product.title}. Feel free to ask me anything about sizing, materials, availability, or any other questions you might have!`,
        },
      ],
    });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Transition show={isOpen}>
      <Dialog onClose={onClose} className='relative z-50'>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter='transition-all ease-in-out duration-300'
          enterFrom='opacity-0 backdrop-blur-none'
          enterTo='opacity-100 backdrop-blur-[.5px]'
          leave='transition-all ease-in-out duration-200'
          leaveFrom='opacity-100 backdrop-blur-[.5px]'
          leaveTo='opacity-0 backdrop-blur-none'
        >
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        </Transition.Child>

        {/* Side Panel */}
        <Transition.Child
          as={Fragment}
          enter='transition-all ease-in-out duration-300'
          enterFrom='translate-x-full'
          enterTo='translate-x-0'
          leave='transition-all ease-in-out duration-200'
          leaveFrom='translate-x-0'
          leaveTo='translate-x-full'
        >
          <Dialog.Panel className='fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[450px] dark:border-neutral-700 dark:bg-black/80 dark:text-white'>
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <SparklesIcon className='h-5 w-5 text-black' />
                <Dialog.Title className='text-lg font-semibold'>
                  Product Assistant
                </Dialog.Title>
              </div>
              <button
                onClick={onClose}
                className='relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white'
                aria-label='Close assistant'
              >
                <XMarkIcon className='h-6 transition-all ease-in-out hover:scale-110' />
              </button>
            </div>

            {/* Messages Container */}
            <div className='flex-1 overflow-y-auto mb-4 space-y-4'>
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
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className='flex justify-start'>
                  <div className='bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-2.5'>
                    <div className='flex gap-1'>
                      <span
                        className='w-2 h-2 bg-neutral-400 rounded-full animate-bounce'
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className='w-2 h-2 bg-neutral-400 rounded-full animate-bounce'
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className='w-2 h-2 bg-neutral-400 rounded-full animate-bounce'
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className='bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg px-4 py-3 text-sm'>
                  Sorry, something went wrong. Please try again.
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className='border-t border-neutral-200 dark:border-neutral-700 pt-4'>
              <form onSubmit={handleSubmit} className='flex gap-2 mb-3'>
                <input
                  type='text'
                  value={input}
                  onChange={handleInputChange}
                  placeholder='Ask about this product...'
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
                  type='submit'
                  disabled={isLoading || !input.trim()}
                  className={clsx(
                    'px-4 py-2.5 rounded-lg',
                    'bg-black hover:bg-black',
                    'text-white font-medium text-sm',
                    'transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'flex items-center gap-2'
                  )}
                >
                  <PaperAirplaneIcon className='h-4 w-4' />
                </button>
              </form>

              {/* Quick prompts */}
              <div className='flex flex-wrap gap-2'>
                {[
                  'What sizes are available?',
                  'Tell me about the materials',
                  'Is this in stock?',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      const event = {
                        target: { value: prompt },
                      } as React.ChangeEvent<HTMLInputElement>;
                      handleInputChange(event);
                      // Auto-submit after a short delay
                      setTimeout(() => {
                        const form = document.querySelector('form');
                        if (form) {
                          const submitEvent = new Event('submit', {
                            bubbles: true,
                            cancelable: true,
                          });
                          form.dispatchEvent(submitEvent);
                        }
                      }, 100);
                    }}
                    className='px-3 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors'
                    disabled={isLoading}
                    type='button'
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
