export const canonicalizeSkill = (skill) => {
  return skill
    .toLowerCase()

    // remove .js and similar
    .replace(/\.js$/g, "")

    // remove version numbers (react 18, html5, css3)
    .replace(/\b(html|css|es)\d+\b/g, "$1")
    .replace(/\bv?\d+(\.\d+)*\b/g, "")

    // normalize plurals (apis → api)
    .replace(/\bapis\b/g, "api")

    // split merged words (gitgithub → git github)
    .replace(/gitgithub/g, "git github")

    // normalize known concatenations
    .replace(/socketio/g, "socket io")

    // remove filler words
    .replace(/\b(framework|library|tool)\b/g, "")

    // clean symbols (allow +, #, .)
    .replace(/[^a-z0-9\s+#.]/g, " ")

    // normalize spaces
    .replace(/\s+/g, " ")
    .trim();
};
