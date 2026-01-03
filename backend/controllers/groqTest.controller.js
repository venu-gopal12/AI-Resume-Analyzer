import groq from "../utils/groqClient.js";

export const testGroq = async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",

      messages: [
        { role: "user", content: "Say OK if you are working" }
      ]
    });

    res.json({
      success: true,
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error("GROQ ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
