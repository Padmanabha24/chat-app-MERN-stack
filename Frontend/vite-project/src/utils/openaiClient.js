import { OpenAI } from "openai"; // Import OpenAI from the updated package

// Initialize OpenAI client with Vite environment variable
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Ensure this variable is correctly set in .env file
  dangerouslyAllowBrowser: true, // Use in browser only for development; avoid for production
});

/**
 * Generate a response from OpenAI GPT models
 * @param {string} prompt - The input prompt for the AI
 * @param {string} [model="gpt-3.5-turbo"] - The OpenAI model to use
 * @param {number} [maxTokens=150] - Maximum tokens in the AI's response
 * @returns {Promise<string>} - The AI-generated response
 */
export const generateResponse = async (prompt, model = "gpt-3.5-turbo", maxTokens = 150) => {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to communicate with OpenAI. Please try again later.");
  }
};


export default openai;
