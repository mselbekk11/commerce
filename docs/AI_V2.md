# AI Assistant Panel V2 - Migration Plan

## Overview
Modernize the AI assistant panel using Vercel's AI Elements components for better UX and maintainability.

## Key Changes

### 1. Replace Message Display
**Current:** Custom message bubbles with manual styling
**New:** Use `Message` and `MessageContent` components from `@/components/ai-elements/message`
- Leverage built-in flat variant for modern ChatGPT-like appearance
- Automatic role-based styling (user/assistant)
- Better markdown support with `Response` component

### 2. Replace Conversation Container
**Current:** Custom scrollable div with manual scroll behavior
**New:** Use `Conversation` and `ConversationContent` components from `@/components/ai-elements/conversation`
- Built-in auto-scroll to bottom
- Automatic scroll button when not at bottom
- Better accessibility with proper ARIA roles

### 3. Modernize Prompt Input
**Current:** Plain HTML input + submit button
**New:** Use `PromptInput` components from `@/components/ai-elements/prompt-input`
- Use minimal config: just `PromptInputBody`, `PromptInputTextarea`, `PromptInputFooter`, `PromptInputTools`, and `PromptInputSubmit`
- Auto-resizing textarea
- Better keyboard shortcuts (Enter to submit, Shift+Enter for new line)
- Built-in status indicators

### 4. Reposition Prompt Suggestions
**Current:** Below the input form
**New:** Above the `PromptInput` component
- Move quick prompt buttons above the input area
- Keep same functionality and styling

### 5. Improve Loading State
**Current:** Three bouncing dots
**New:** Streaming text display using Vercel's components
- Show AI response as it streams in
- Better visual feedback during generation

## Component Structure
```tsx
<Conversation>
  <ConversationContent>
    {messages.map(message => (
      <Message from={message.role}>
        <MessageContent variant="flat">
          <Response>{message.content}</Response>
        </MessageContent>
      </Message>
    ))}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>

{/* Quick prompts above input */}
<div className="flex flex-wrap gap-2">
  {prompts.map(...)}
</div>

<PromptInput onSubmit={handleSubmit}>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputTools />
    <PromptInputSubmit status={status} />
  </PromptInputFooter>
</PromptInput>
```

## Implementation Steps
1. Install/add ai-elements components (conversation, message, prompt-input, response)
2. Replace message rendering with Message components
3. Wrap messages in Conversation component
4. Replace input form with PromptInput components
5. Move prompt suggestions above input
6. Remove custom loading dots (streaming handled by useChat + Response)
7. Test and adjust styling to match design system

## Questions
- Should we keep the current welcome message behavior?
- Any specific styling preferences for the prompt suggestions positioning?
