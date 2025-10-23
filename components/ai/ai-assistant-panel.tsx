'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from '@/components/ai-elements/prompt-input';
import { Response } from '@/components/ai-elements/response';
import { Button } from '@/components/ui/button';
import { Dialog, Transition } from '@headlessui/react';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useChat } from 'ai/react';
import { Product } from 'lib/shopify/types';
import { Fragment, useState } from 'react';

interface AIAssistantPanelProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const PROMPT_SUGGESTIONS = [
  'What sizes are available?',
  'Tell me about the materials',
  'Is this in stock?',
  'What colors are available?',
];

export function AIAssistantPanel({
  product,
  isOpen,
  onClose,
}: AIAssistantPanelProps) {
  const [text, setText] = useState<string>('');

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
  const { messages, append, status } = useChat({
    api: '/api/product-chat',
    body: {
      productContext,
    },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hi! I'm here to help you learn about ${product.title}. Feel free to ask me anything about sizing, materials, availability, or any other questions you might have!`,
      },
    ],
  });

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);

    if (!hasText) {
      return;
    }

    append({ role: 'user', content: message.text || '' });
    setText('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    append({ role: 'user', content: suggestion });
  };

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
          <Dialog.Panel className='fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[550px] dark:border-neutral-700 dark:bg-black/80 dark:text-white'>
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <SparklesIcon className='h-5 w-5 text-black dark:text-white' />
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

            {/* Conversation Container */}
            <Conversation className='flex-1 mb-4'>
              <ConversationContent>
                {messages
                  .filter((message) => message.role !== 'data')
                  .map((message) => (
                    <Message
                      from={message.role as 'assistant' | 'system' | 'user'}
                      key={message.id}
                    >
                      <MessageContent variant='flat'>
                        <Response>{message.content}</Response>
                      </MessageContent>
                    </Message>
                  ))}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            {/* Prompt Suggestions - Above Input */}

            <div className='hidden md:grid md:grid-cols-2 md:gap-2 md:mb-4'>
              {PROMPT_SUGGESTIONS.map((suggestion) => (
                <Button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  variant='outline'
                  size='sm'
                  className='rounded-full px-4'
                  disabled={status === 'streaming'}
                  type='button'
                >
                  {suggestion}
                </Button>
              ))}
            </div>

            {/* Prompt Input */}
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputBody>
                <PromptInputTextarea
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  placeholder='Ask about this product...'
                />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools />
                <PromptInputSubmit
                  disabled={!text.trim()}
                  status={status === 'streaming' ? 'streaming' : 'ready'}
                />
              </PromptInputFooter>
            </PromptInput>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
