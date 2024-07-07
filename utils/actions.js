"use server";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const generateChatResponse = async (message) => {
    const completion = await openai.chat.completions.create({
         model: "gpt-3.5-turbo",
         messages: [
            {role: "system", content: "You are a helpful assistant..."},
            {role: "user", content: message},
         ],
         temperature: 0,
      max_tokens: 100,
    })
    console.log(completion.choices[0].message);
    console.log(completion);
}
