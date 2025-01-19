import openai from "./Openaiclient"; // Import the properly configured OpenAI client

// Translate a message using GPT
export const translateMessage = async (message, targetLang) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a translation assistant." },
        { role: "user", content: `Translate this to ${targetLang}: ${message}` },
      ],
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};

// Generate a smart reply using GPT
export const generateReply = async (message) => {
  try {
    console.log("Generating reply for:", message); // Log the incoming message
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for chat applications." },
        { role: "user", content: `Reply to this message: ${message}` },
      ],
    });
    console.log("API Response:", response.data); // Log the API response
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Reply generation error:", error?.response?.data || error.message);
    throw new Error("Failed to generate AI reply.");
  }
};

