"use server";

import { db } from "./db";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant..." },
        ...chatMessages,
      ],
      temperature: 0,
      max_tokens: 100,
    });
    console.log(response.choices[0].message);
    console.log(response);
    return response.choices[0].message;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistingTour = async ({ city, country }) => {
  return await db.tour.findUnique({
    where: {
      city_country: {
        city: city,
        country: country,
      },
    },
  });
};

export const generateTourResponse = async ({ city, country }) => {
  const query = `Find a ${city} in this ${country}.
If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "description of the city and tour",
    "stops": ["stop name", "stop name","stop name"]
  }
}
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a tour guide" },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    // potentially returns a text with error message
    const tourData = JSON.parse(response.choices[0].message.content);

    if (!tourData.tour) {
      return null;
    }

    return tourData.tour;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createNewTour = async (tour) => {
  //creates new tour in the database
  return db.tour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "asc",
      },
    });
    return tours;
  } else {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const tours = await prisma.tour.findMany({
      where: {
        OR: [
          { city: { contains: normalizedSearchTerm, mode: "insensitive" } },
          { country: { contains: normalizedSearchTerm, mode: "insensitive" } },
        ],
      },
      orderBy: {
        city: "asc",
      },
    });
    return tours;
  }
};



export const getSingleTour = async (id) => {
  return await db.tour.findUnique({
    where: {
      id: id,
    },
  });
};

export const generateTourImage = async ({ city, country }) => {
  try {
    const tourImage = await openai.images.generate({
      prompt: `A panoramic view of tech ${city}, ${country}`,
      n: 1,
      size: "512x512",
    });
    return tourImage?.data[0]?.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//////tokens
//.get tokens base on the id
export const getUserTokensById = async (clerkId) => {
  const result = await db.token.findUnique({
    where: {
      clerkId: clerkId,
    },
  });
  return result?.tokens;
};

export const generateUserTokensForId = async (clerkId) => {
  const result = await db.token.create({
    data: {
      clerkId,
    },
  });
  return result?.tokens;
};

export const getOrGenerateTokens = async (clerkId) => {
  const token = await getUserTokensById(clerkId);
  if (!token) {
    return await generateUserTokensForId(clerkId);
  }
  return token;
};

export const subtractTokens = async (clerkId, tokens) => {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });
  revalidatePath("/profile");
  // Return the new token value
  return result.tokens;
};
