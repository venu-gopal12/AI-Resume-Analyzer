import groq from "../utils/groqClient.js";

export const generateSuggestions = async ({
  missingTools = [],
  missingAbilities = [],
  jobTitle = ""
}) => {
  if (missingTools.length === 0 && missingAbilities.length === 0) {
    return ["Your resume already aligns well with this job description."];
  }

  const prompt = `
Job Title: ${jobTitle}

Missing Tools:
${missingTools.join(", ") || "None"}

Missing Technical Abilities:
${missingAbilities.join(", ") || "None"}

Provide resume improvement suggestions.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `
You are a resume optimization expert.

Rules:
- Give concise, actionable resume improvement suggestions
- Do NOT invent tools or skills
- Only reference the provided missing items
- Focus on resume wording and structure
- Use bullet points only
        `.trim()
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.choices[0].message.content
    .split("\n")
    .filter(Boolean);
};
