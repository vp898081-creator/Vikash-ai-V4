function handleCommand(input, memory, memoryTools = {}) {
  const raw = String(input || "").trim();
  const text = raw.toLowerCase().trim();

  const addFact = memoryTools.addFact || function () {
    return false;
  };

  const getFacts = memoryTools.getFacts || function () {
    return memory.facts || [];
  };

  const removeFact = memoryTools.removeFact || function () {
    return [];
  };

  const searchMemory = memoryTools.searchMemory || function () {
    return [];
  };

  const updateProfile = memoryTools.updateProfile || function () {
    return false;
  };

  const addLike = memoryTools.addLike || function () {
    return false;
  };

  const addDislike = memoryTools.addDislike || function () {
    return false;
  };

  const removeLike = memoryTools.removeLike || function () {
    return [];
  };

  const removeDislike = memoryTools.removeDislike || function () {
    return [];
  };

  // --------------------------------
  // नाम पूछना
  // --------------------------------
  if (
    text === "mera naam kya hai" ||
    text === "mera naam kya h" ||
    text === "मेरा नाम क्या है"
  ) {
    return memory.name
      ? `आपका नाम ${memory.name} है।`
      : "मुझे अभी आपका नाम नहीं पता।";
  }

  // --------------------------------
  // नाम सेव / update
  // --------------------------------
  if (
    text.startsWith("mera naam ") ||
    text.startsWith("मेरा नाम ")
  ) {
    let name;

    if (text.startsWith("mera naam ")) {
      name = raw.substring(10).trim();
    } else {
      name = raw.substring(9).trim();
    }

    if (!name) {
      return "आपका नाम क्या है?";
    }

    name = name.replace(/\b\w/g, c => c.toUpperCase());

    if (!updateProfile(memory, "name", name)) {
      return "मैं आपका नाम याद नहीं रख पाया।";
    }

    return `ठीक है, मैंने आपका नाम ${name} याद रख लिया।`;
  }

  // --------------------------------
  // उम्र पूछना
  // --------------------------------
  if (
    text === "meri umr kya hai" ||
    text === "meri umar kya hai" ||
    text === "meri umr kya h" ||
    text === "meri umar kya h" ||
    text === "मेरी उम्र क्या है"
  ) {
    return memory.age
      ? `आपकी उम्र ${memory.age} है।`
      : "मुझे अभी आपकी उम्र नहीं पता।";
  }

    // --------------------------------
  // उम्र सेव / update
  // --------------------------------
  if (
    text.startsWith("meri umr ") ||
    text.startsWith("meri umar ") ||
    text.startsWith("meri umra ") ||
    text.startsWith("मेरी उम्र ") ||
    text.startsWith("मेरी उमर ") ||
    text.startsWith("मेरी उम्रा ")
  ) {
    let age;

    if (text.startsWith("meri umr ")) {
      age = raw.substring(9).trim();
    } else if (text.startsWith("meri umar ")) {
      age = raw.substring(10).trim();
    } else if (text.startsWith("meri umra ")) {
      age = raw.substring(10).trim();
    } else if (text.startsWith("मेरी उम्र ")) {
      age = raw.substring(9).trim();
    } else if (text.startsWith("मेरी उमर ")) {
      age = raw.substring(9).trim();
    } else {
      age = raw.substring(10).trim();
    }

    if (!age) {
      return "आपकी उम्र क्या है?";
    }

age = age
  .replace(/\s+(hai|है)$/i, "")
  .trim();	

    if (!updateProfile(memory, "age", age)) {
      return "मैं आपकी उम्र याद नहीं रख पाया।";
    }

    return `ठीक है, मैंने आपकी उम्र ${age} साल याद रख ली।`;
  }

  // --------------------------------
  // पसंद पूछना
  // --------------------------------
  if (
    text === "mujhe kya pasand hai" ||
    text === "mujhe kya kya pasand hai" ||
    text === "meri pasand kya hai" ||
    text === "मेरी पसंद क्या है"
  ) {
    if (!memory.likes || memory.likes.length === 0) {
      return "मुझे अभी आपकी पसंद नहीं पता।";
    }

    return `आपको ${memory.likes.join(", ")} पसंद है।`;
  }

  // --------------------------------
// पसंद हटाना
// --------------------------------
if (
  text.startsWith("pasand hatao ") ||
  text.startsWith("pasand hata do ") ||
  text.startsWith("meri pasand se hatao ") ||
  text.startsWith("meri pasand se hata do ")
) {
  let like = raw
    .replace(/^pasand\s+hatao\s+/i, "")
    .replace(/^pasand\s+hata\s+do\s+/i, "")
    .replace(/^meri\s+pasand\s+se\s+hatao\s+/i, "")
    .replace(/^meri\s+pasand\s+se\s+hata\s+do\s+/i, "")
    .trim();

  if (!like) {
    return "कौन सी पसंद हटानी है?";
  }

  const removed = removeLike(memory, like);

  return removed.length
    ? `ठीक है, मैंने ${removed.join(", ")} को आपकी पसंद से हटा दिया।`
    : `मुझे आपकी पसंद में ${like} नहीं मिला।`;
}

  // --------------------------------
  // नापसंद पूछना
  // --------------------------------
  if (
    text === "mujhe kya pasand nahi hai" ||
    text === "mujhe kya kya pasand nahi hai" ||
    text === "meri napasand kya hai" ||
    text === "meri na pasand kya hai" ||
    text === "मेरी नापसंद क्या है"
  ) {
    if (!memory.dislikes || memory.dislikes.length === 0) {
      return "मुझे अभी आपकी नापसंद के बारे में कुछ पता नहीं है।";
    }

    return `आपको ${memory.dislikes.join(", ")} पसंद नहीं है।`;
  }

  // --------------------------------
  // नापसंद सेव करना
  // --------------------------------
  if (
    text.startsWith("mujhe ") &&
    (
      text.includes(" pasand nahi hai") ||
      text.includes(" pasand nahi")
    )
  ) {
    const dislike = raw
      .replace(/^mujhe\s+/i, "")
      .replace(/\s+pasand nahi hai.*$/i, "")
      .replace(/\s+pasand nahi.*$/i, "")
      .trim();

    if (!dislike) {
      return "क्या चीज़ आपको पसंद नहीं है?";
    }

    const added = addDislike(memory, dislike);

    return added
      ? `ठीक है, मैंने याद रख लिया कि आपको ${dislike} पसंद नहीं है।`
      : `यह बात पहले से मेरी memory में है।`;
  }

  // --------------------------------
  // पसंद सेव करना
  // --------------------------------
  if (
    text.startsWith("mujhe ") &&
    text.includes(" pasand hai")
  ) {
    const like = raw
      .replace(/^mujhe\s+/i, "")
      .split(/\s+pasand hai/i)[0]
      .trim();

    if (!like) {
      return "क्या चीज़ आपको पसंद है?";
    }

    const added = addLike(memory, like);

    return added
      ? `ठीक है, मैंने याद रख लिया कि आपको ${like} पसंद है।`
      : `यह बात पहले से मेरी memory में है।`;
  }

  // --------------------------------
  // Smart fact save
  // --------------------------------
  if (
    text.startsWith("yaad rakho ") ||
    text.startsWith("yaad rakh ") ||
    text.startsWith("yaad rakhna ") ||
    text.startsWith("yad rakho ") ||
    text.startsWith("yad rakh ") ||
    text.startsWith("yad rakhna ") ||
    text.startsWith("ise yaad rakho ") ||
    text.startsWith("ise yad rakho ") ||
    text.startsWith("याद रखो ") ||
    text.startsWith("याद रखना ")
  ) {
    let fact = raw
      .replace(/^ise\s+/i, "")
      .replace(/^yaad\s+rakho\s+/i, "")
      .replace(/^yaad\s+rakhna\s+/i, "")
      .replace(/^yaad\s+rakh\s+/i, "")
      .replace(/^yad\s+rakho\s+/i, "")
      .replace(/^yad\s+rakhna\s+/i, "")
      .replace(/^yad\s+rakh\s+/i, "")
      .replace(/^याद\s+रखो\s+/i, "")
      .replace(/^याद\s+रखना\s+/i, "")
      .trim();

    fact = fact.replace(/^ki\s+/i, "").trim();
    fact = fact.replace(/^कि\s+/i, "").trim();

    if (!fact) {
      return "क्या याद रखना है?";
    }

    const added = addFact(memory, fact);

    return added
      ? "ठीक है, मैंने इसे याद रख लिया।"
      : "यह बात पहले से मेरी memory में है।";
  }

  // --------------------------------
  // Smart facts पूछना
  // --------------------------------
  if (
    text === "mere bare mein kya yaad hai" ||
    text === "mere bare me kya yaad hai" ||
    text === "mere bare mein kya yad hai" ||
    text === "mere bare me kya yad hai" ||
    text === "tumhe mere bare mein kya yaad hai" ||
    text === "tumhe mere bare me kya yaad hai" ||
    text === "tumhe mere bare mein kya yad hai" ||
    text === "tumhe mere bare me kya yad hai"
  ) {
    const parts = [];

    if (memory.name) {
      parts.push(`नाम: ${memory.name}`);
    }

    if (memory.age) {
      parts.push(`उम्र: ${memory.age}`);
    }

    if (memory.likes && memory.likes.length) {
      parts.push(`पसंद: ${memory.likes.join(", ")}`);
    }

    if (memory.dislikes && memory.dislikes.length) {
      parts.push(`नापसंद: ${memory.dislikes.join(", ")}`);
    }

    const facts = getFacts(memory);

    if (facts.length) {
      parts.push(`facts: ${facts.join(", ")}`);
    }

    if (!parts.length) {
      return "अभी मैंने आपके बारे में कोई जानकारी याद नहीं रखी है।";
    }

    return `मुझे आपके बारे में यह याद है: ${parts.join(" | ")}।`;
  }

  // --------------------------------
  // Memory search
  // --------------------------------
  if (
    text.startsWith("memory search ") ||
    text.startsWith("search memory ") ||
    text.startsWith("memory mein ") ||
    text.startsWith("memory me ")
  ) {
    let query = raw
      .replace(/^memory\s+search\s+/i, "")
      .replace(/^search\s+memory\s+/i, "")
      .replace(/^memory\s+mein\s+/i, "")
      .replace(/^memory\s+me\s+/i, "")
      .trim();

    if (!query) {
      return "क्या खोजूँ?";
    }

    const results = searchMemory(memory, query);

    return results.length
      ? `Memory में मिला: ${results.join(" | ")}।`
      : `Memory में "${query}" से संबंधित कुछ नहीं मिला।`;
  }

  // --------------------------------
  // Memory भूलना
  // --------------------------------
  if (
    text.startsWith("bhool jao ") ||
    text.startsWith("bhul jao ") ||
    text.startsWith("forget ") ||
    text.startsWith("memory bhool jao ") ||
    text.startsWith("याद भूल जाओ ")
  ) {
    let query = raw
      .replace(/^memory\s+bhool\s+jao\s+/i, "")
      .replace(/^bhool\s+jao\s+/i, "")
      .replace(/^bhul\s+jao\s+/i, "")
      .replace(/^forget\s+/i, "")
      .replace(/^याद\s+भूल\s+जाओ\s+/i, "")
      .trim();

    if (!query) {
      return "कौन सी memory भूलनी है?";
    }

    const removedFacts = removeFact(memory, query);
    const removedLikes = removeLike(memory, query);
    const removedDislikes = removeDislike(memory, query);

    let removedProfile = false;

    if (
      memory.name &&
      memory.name.toLowerCase().includes(query.toLowerCase())
    ) {
      memory.name = "";
      removedProfile = true;
    }

    if (
      memory.age &&
      String(memory.age).toLowerCase().includes(query.toLowerCase())
    ) {
      memory.age = "";
      removedProfile = true;
    }

    const total =
      removedFacts.length +
      removedLikes.length +
      removedDislikes.length +
      (removedProfile ? 1 : 0);

    if (!total) {
      return `मुझे "${query}" से संबंधित कोई memory नहीं मिली।`;
    }

    return `ठीक है, "${query}" से संबंधित memory भूल दी।`;
  }

  return null;
}

module.exports = {
  handleCommand
};
