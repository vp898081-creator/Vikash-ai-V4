function handleCommand(input, memory, memoryTools = {}) {
  const text = input.toLowerCase().trim();

  const addFact = memoryTools.addFact || function () {};
  const getFacts = memoryTools.getFacts || function () {
    return memory.facts || [];
  };

  // नाम पूछना
  if (text === "mera naam kya hai") {
    return memory.name
      ? `आपका नाम ${memory.name} है।`
      : "मुझे अभी आपका नाम नहीं पता।";
  }

  // नाम सेव करना
  if (text.startsWith("mera naam ")) {
    memory.name = input
      .substring(10)
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase());

    return "ठीक है, मैंने आपका नाम याद रख लिया।";
  }

  // उम्र पूछना
  if (text === "meri umr kya hai") {
    return memory.age
      ? `आपकी उम्र ${memory.age} है।`
      : "मुझे अभी आपकी उम्र नहीं पता।";
  }

  // उम्र सेव करना
  if (text.startsWith("meri umr ")) {
    memory.age = input.substring(9).trim();
    return "ठीक है, मैंने आपकी उम्र याद रख ली।";
  }

  // पसंद पूछना
  if (text === "mujhe kya pasand hai") {
    if (!memory.likes || memory.likes.length === 0) {
      return "मुझे अभी आपकी पसंद नहीं पता।";
    }

    return `आपको ${memory.likes.join(", ")} पसंद है।`;
  }

  // पसंद सेव करना
  if (text.startsWith("mujhe ") && text.includes(" pasand hai")) {
    const like = text
      .replace("mujhe ", "")
      .split(" pasand hai")[0]
      .trim();

    if (!memory.likes) {
      memory.likes = [];
    }

    if (!memory.likes.includes(like)) {
      memory.likes.push(like);
    }

    return `ठीक है, मैंने याद रख लिया कि आपको ${like} पसंद है।`;
  }

  // Smart fact save
  if (
  text.startsWith("yaad rakho ") ||
  text.startsWith("yaad rakh ") ||
  text.startsWith("yaad rakhna ") ||
  text.startsWith("yad rakho ") ||
  text.startsWith("yad rakh ") ||
  text.startsWith("yad rakhna ") ||
  text.startsWith("ise yaad rakho ") ||
  text.startsWith("ise yad rakho ")
) {
    let fact = input
  .replace(/^ise\s+/i, "")
  .replace(/^yaad\s+rakkho\s+/i, "")
  .replace(/^yaad\s+rakho\s+/i, "")
  .replace(/^yaad\s+rakhna\s+/i, "")
  .replace(/^yaad\s+rakh\s+/i, "")
  .replace(/^yad\s+rakho\s+/i, "")
  .replace(/^yad\s+rakhna\s+/i, "")
  .replace(/^yad\s+rakh\s+/i, "")
  .trim();

fact = fact.replace(/^ki\s+/i, "").trim();

    if (!fact) {
      return "क्या याद रखना है?";
    }

    const added = addFact(memory, fact);

    return added
      ? "ठीक है, मैंने इसे याद रख लिया।"
      : "यह बात पहले से मेरी memory में है।";
  }

  // Smart facts पूछना
  if (
  text === "mere bare mein kya yaad hai" ||
  text === "mere bare me kya yaad hai" ||
  text === "mere bare mein kya yad hai" ||
  text === "mere bare me kya yad hai" ||
  text === "mere bare mein kya yaad h" ||
  text === "mere bare me kya yaad h" ||
  text === "tumhe mere bare mein kya yaad hai" ||
  text === "tumhe mere bare me kya yaad hai" ||
  text === "tumhe mere bare mein kya yad hai" ||
  text === "tumhe mere bare me kya yad hai"
) {
    const facts = getFacts(memory);

    if (!facts.length) {
      return "अभी मैंने आपके बारे में कोई अतिरिक्त जानकारी याद नहीं रखी है।";
    }

    return `मुझे आपके बारे में यह याद है: ${facts.join(", ")}।`;
  }

  return null;
}

module.exports = {
  handleCommand
};
