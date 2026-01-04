import { canonicalizeSkill } from "./canonicalSkill.util.js";

export const buildCanonicalText = ({
  toolsAndTechnologies = [],
  technicalAbilities = []
}) => {
  const canonicalTools = toolsAndTechnologies
    .map(canonicalizeSkill)
    .filter(Boolean);

  const canonicalAbilities = technicalAbilities
    .map(canonicalizeSkill)
    .filter(Boolean);

  return `
Tools: ${canonicalTools.join(", ")}
Abilities: ${canonicalAbilities.join(", ")}
  `.trim();
};
