const fs = require("fs");

const FILE = "memory.json";

function loadMemory() {
  if (!fs.existsSync(FILE)) {
    return {
      name: "",
      age: "",
      likes: [],
      chatHistory: []
    };
  }

  try {
    const data = fs.readFileSync(FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return {
      name: "",
      age: "",
      likes: [],
      chatHistory: []
    };
  }
}

function saveMemory(memory) {
  fs.writeFileSync(FILE, JSON.stringify(memory, null, 2));
}

module.exports = {
  loadMemory,
  saveMemory
};
