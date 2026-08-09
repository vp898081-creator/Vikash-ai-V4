const fs = require("fs");

const FILE = "memory.json";

function defaultMemory() {
  return {
    name: "",
    age: "",
    likes: [],
    dislikes: [],
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
    if (!Array.isArray(memory.dislikes)) memory.dislikes = [];
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

function cleanText(value) {
  return String(value || "").trim();
}

function addFact(memory, fact) {
  const cleanFact = cleanText(fact);

  if (!cleanFact) return false;

  if (!Array.isArray(memory.facts)) {
    memory.facts = [];
  }

  const exists = memory.facts.some(
    item => item.toLowerCase() === cleanFact.toLowerCase()
  );

  if (exists) {
    return false;
  }

  memory.facts.push(cleanFact);
  saveMemory(memory);

  return true;
}

function getFacts(memory) {
  if (!Array.isArray(memory.facts)) {
    memory.facts = [];
  }

  return memory.facts;
}

function removeFact(memory, query) {
  const cleanQuery = cleanText(query).toLowerCase();

  if (!cleanQuery || !Array.isArray(memory.facts)) {
    return [];
  }

  const removed = [];

  memory.facts = memory.facts.filter(fact => {
    if (fact.toLowerCase().includes(cleanQuery)) {
      removed.push(fact);
      return false;
    }

    return true;
  });

  if (removed.length > 0) {
    saveMemory(memory);
  }

  return removed;
}

function searchMemory(memory, query) {
  const cleanQuery = cleanText(query).toLowerCase();

  if (!cleanQuery) return [];

  const results = [];

  if (
    memory.name &&
    memory.name.toLowerCase().includes(cleanQuery)
  ) {
    results.push(`नाम: ${memory.name}`);
  }

  if (
    memory.age &&
    String(memory.age).toLowerCase().includes(cleanQuery)
  ) {
    results.push(`उम्र: ${memory.age}`);
  }

  for (const like of memory.likes || []) {
    if (like.toLowerCase().includes(cleanQuery)) {
      results.push(`पसंद: ${like}`);
    }
  }

  for (const dislike of memory.dislikes || []) {
    if (dislike.toLowerCase().includes(cleanQuery)) {
      results.push(`नापसंद: ${dislike}`);
    }
  }

  for (const fact of memory.facts || []) {
    if (fact.toLowerCase().includes(cleanQuery)) {
      results.push(`Fact: ${fact}`);
    }
  }

  return results;
}

function updateProfile(memory, field, value) {
  const cleanValue = cleanText(value);

  if (!cleanValue) return false;

  const allowedFields = [
    "name",
    "age"
  ];

  if (!allowedFields.includes(field)) {
    return false;
  }

  memory[field] = cleanValue;
  saveMemory(memory);

  return true;
}

function addLike(memory, value) {
  const cleanValue = cleanText(value);

  if (!cleanValue) return false;

  if (!Array.isArray(memory.likes)) {
    memory.likes = [];
  }

  const exists = memory.likes.some(
    item => item.toLowerCase() === cleanValue.toLowerCase()
  );

  if (exists) return false;

  memory.likes.push(cleanValue);
  saveMemory(memory);

  return true;
}

function addDislike(memory, value) {
  const cleanValue = cleanText(value);

  if (!cleanValue) return false;

  if (!Array.isArray(memory.dislikes)) {
    memory.dislikes = [];
  }

  const exists = memory.dislikes.some(
    item => item.toLowerCase() === cleanValue.toLowerCase()
  );

  if (exists) return false;

  memory.dislikes.push(cleanValue);
  saveMemory(memory);

  return true;
}

function removeLike(memory, query) {
  const cleanQuery = cleanText(query).toLowerCase();

  if (!cleanQuery) return [];

  const removed = [];

  memory.likes = (memory.likes || []).filter(item => {
    if (item.toLowerCase().includes(cleanQuery)) {
      removed.push(item);
      return false;
    }

    return true;
  });

  if (removed.length > 0) {
    saveMemory(memory);
  }

  return removed;
}

function removeDislike(memory, query) {
  const cleanQuery = cleanText(query).toLowerCase();

  if (!cleanQuery) return [];

  const removed = [];

  memory.dislikes = (memory.dislikes || []).filter(item => {
    if (item.toLowerCase().includes(cleanQuery)) {
      removed.push(item);
      return false;
    }

    return true;
  });

  if (removed.length > 0) {
    saveMemory(memory);
  }

  return removed;
}

module.exports = {
  loadMemory,
  saveMemory,
  addFact,
  getFacts,
  removeFact,
  searchMemory,
  updateProfile,
  addLike,
  addDislike,
  removeLike,
  removeDislike
};
