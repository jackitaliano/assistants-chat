export const ASSISTANT_NAME = "YourAssistant";

export const ASSISTANT_VERSION = "1.0";

export const ASSISTANT_LOGO = "assistant.png";
export const ASSISTANT_LOGO_DESC = "Assistant icon of person wearing a headset";

export const ASSISTANT_TAGLINE = "Your Assitant for assisting.";
export const ASSISTANT_DESCRIPTION = "I'm an OpenAI [GPT-4](https://openai.com/research/gpt-4) [assistant](https://platform.openai.com/docs/assistants/how-it-works)."

export const ASSISTANT_MODEL = "gpt-3.5-turbo-0125";

export const ASSISTANT_INSTRUCTIONS = ``;

export const GET_WEATHER_FUNC = {
  "name": "get_weather",
  "description": "Determine weather in my location",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "The city and state e.g. San Francisco, CA"
      },
      "unit": {
        "type": "string",
        "enum": [ "C", "F" ],
      }
    },
    "required": [ "location" ]
  }
}

export const ASSISTANT_INITIAL_MESSAGES = [
  { role: "ai", text: `Hi, I'm **${ASSISTANT_NAME}**, ${ASSISTANT_TAGLINE}. ${ASSISTANT_DESCRIPTION}` },
  { role: "ai", text: "How can I assist you today?" }
]

export const ASSISTANT_CONFIG = {
  model: ASSISTANT_MODEL,
  name: ASSISTANT_NAME + "v" + ASSISTANT_VERSION,
  instructions: ASSISTANT_INSTRUCTIONS,
  tools: [
    { type: "code_interpreter" },
    { type: "retrieval" },
    {
      type: "function",
      function: GET_WEATHER_FUNC 
    }
  ]
}
