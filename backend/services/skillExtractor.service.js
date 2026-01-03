import groq from "../utils/groqClient.js";

export const extractTechnicalData = async (text) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
You extract technical requirements from professional text.

Rules:
- Return ONLY valid JSON
- No explanations
- No markdown
- No extra text
- Preserve exact phrasing used in the text where possible
- Prefer noun phrases over verbs
- Do NOT paraphrase unless required
- Exclude soft skills and personality traits

Categories:
1. toolsAndTechnologies
   - programming languages
   - frameworks
   - libraries
   - databases
   - cloud platforms
   - developer tools

2. technicalAbilities
   - technical responsibilities written as noun phrases
   - examples: "Project Management", "REST API Development"

Output format:
{
  "toolsAndTechnologies": [],
  "technicalAbilities": []
}

        `.trim()
      },
      {
        role: "user",
        content: text
      }
    ]
  });

  return JSON.parse(response.choices[0].message.content);
};
