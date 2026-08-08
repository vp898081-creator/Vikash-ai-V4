const fs = require("fs");

const FILE = "memory.json";

function defaultMemory() {
  return {
    name: "",
    age: "",
    likes: [],
    facts: [],
    chatHistory: []
  };
}

function loadMemory() {
  if (!fs.existsSync(FILE)) {
    return defaultMemory();
  }

  try {
    const data = fs.readFileSync(FILE, "utf8");
    const memory = JSON.parse(data);

    // पुराने memory.json को भी compatible रखें
    if (!memory.name) memory.name = "";
    if (!memory.age) memory.age = "";
    if (!Array.isArray(memory.likes)) memory.likes = [];
    if (!Array.isArray(memory.facts)) memory.facts = [];
    if (!Array.isArray(memory.chatHistory)) {
      memory.chatHistory = [];
    }

    return memory;

  } catch (error) {
    console.log("⚠️ Memory load error:", error.message);
    return defaultMemory();
  }
}

function saveMemory(memory) {
  fs.writeFileSync(
    FILE,
    JSON.stringify(memory, null, 2)
  );
}

function addFact(memory, fact) {
  if (!fact || !fact.trim()) return false;

  const cleanFact = fact.trim();

  if (!Array.isArray(memory.facts)) {
    memory.facts = [];
  }

  const exists = memory.facts.some(
    item => item.toLowerCase() === cleanFact.toLowerCase()
  );

  if (!exists) {
    memory.facts.push(cleanFact);
    saveMemory(memory);
    return true;
  }

  return false;
}

function getFacts(memory) {
  if (!Array.isArray(memory.facts)) {
    memory.facts = [];
  }

  return memory.facts;
}

module.exports = {
  loadMemory,
  saveMemory,
  addFact,
  getFacts
};
