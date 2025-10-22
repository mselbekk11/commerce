import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
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
      messages: any[];
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
      messages: convertToCoreMessages(messages),
      temperature: 0.7,
    });

    // Return streaming response
    return result.toTextStreamResponse();

  } catch (error) {
    console.error('Product chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
