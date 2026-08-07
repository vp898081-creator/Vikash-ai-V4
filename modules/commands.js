function handleCommand(input, memory) {
  const text = input.toLowerCase().trim();

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

  return null;
}

module.exports = {
  handleCommand
};
