export const buildCanonicalText = ({
  toolsAndTechnologies = [],
  technicalAbilities = []
}) => {
  return `
Tools: ${toolsAndTechnologies.join(", ")}
Abilities: ${technicalAbilities.join(", ")}
  `.trim();
};
