# Assistants Chat
## What it is
Chat with your assistants, save their history, multiple chats. Run 100% in the browser.

[Try it](https://jackitaliano.github.io/assistants-chat/)

## How to use
1. Load your own OpenAI Assistant's config into `src/components/assistant/assistant.js` (and if needed adjust `assistantFunctions.js`)
2. `npm ci`
3. `npm run dev`

## Disclaimers
- This is not a fully developed app. Feel free to customize it to your liking
- Local storage is used to store: OpenAI key, assistant id, thread ids
  - Strongly recommend changing this if using for anything where you provide a key

## Credit
- Heavily depends on [ovidijusparsiunas/deep-chat](https://github.com/ovidijusparsiunas/deep-chat)
- Much of development done on/by [nasa-petal/bidara-deep-chat](https://github.com/nasa-petal/bidara-deep-chat)
  - [Try Bidara](https://nasa-petal.github.io/bidara-deep-chat/)

## Screenshots

<img src="https://github.com/jackitaliano/assistants-chat/assets/93797825/1d78391c-0325-400f-874f-178fb92df9bf" width="70%"/>

*Desktop*

<div style="display: flex; justify-content: space-around;">
<img src="https://github.com/jackitaliano/assistants-chat/assets/93797825/a07d5b65-f19f-4ade-bffb-164bc9fe9f74" width="35%"/>
<img src="https://github.com/jackitaliano/assistants-chat/assets/93797825/023121fc-0189-4256-93ba-2311ac723356" width="35%"/>
</div>

*Mobile PWA*
