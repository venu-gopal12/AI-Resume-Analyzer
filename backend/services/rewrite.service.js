import groq from "../utils/groqClient.js";

export const rewriteResumeContent = async ({
  resumeText,
  jobDescription,
  missingSkills = [],
}) => {
  const prompt = `
You are an expert resume writer. I will provide a resume, a job description (JD), and a list of missing skills.

Your task:
1. Identify 3 weak or generic bullet points in the resume that could be improved to show the missing skills.
2. Rewrite them to be powerful, quantitative, and keyword-rich, specifically targeting the Job Description and Missing Skills.

Resume Content:
${resumeText.substring(0, 3000)}... (truncated for context)

Job Description:
${jobDescription.substring(0, 1000)}...

Missing Skills to target:
${missingSkills.join(", ")}

Output strictly in JSON format:
{
  "rewrites": [
    {
      "original": "The original bullet point text...",
      "rewritten": "The improved, powerful bullet point...",
      "explanation": "Why this change helps (e.g. 'Added [Skill] and improved action verb')"
    }
  ]
}
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a JSON-only API. Output ONLY valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("Rewrite generation failed:", error);
    throw new Error("Failed to generate rewrites");
  }
};
