require("dotenv").config();

const readline = require("readline-sync");

const { loadMemory, saveMemory } = require("./modules/memory");
const { handleCommand } = require("./modules/commands");
const { askOpenRouter } = require("./modules/openrouter");
const { addMessage } = require("./modules/chat");

const apiKey = process.env.OPENROUTER_API_KEY;

let memory = loadMemory();

if (!memory.chatHistory) {
  memory.chatHistory = [];
}

let chatHistory = memory.chatHistory;

async function main() {
  while (true) {
    const question = readline.question("Tum: ");

    if (question.toLowerCase() === "exit") {
      console.log("👋 Bye!");
      break;
    }

    const commandReply = handleCommand(question, memory);

    if (commandReply) {
      saveMemory(memory);
      console.log("\nAI:", commandReply);
      console.log();
      continue;
    }

    addMessage(chatHistory, "user", question);

    try {
const reply = await askOpenRouter(apiKey, [
  {
    role: "system",
    content:
      "You are Vikash AI. Always answer in Hindi. User memory: " +
      JSON.stringify(memory)
  },
  ...chatHistory
]);

addMessage(chatHistory, "assistant", reply);

memory.chatHistory = chatHistory;
saveMemory(memory);

console.log("\nAI:", reply);
console.log();

} 
const reply = await askOpenRouter(apiKey, [
  {
    role: "system",
    content:
      "You are Vikash AI. Always answer in Hindi. User memory: " +
      JSON.stringify(memory)
  },
  ...chatHistory
]);

addMessage(chatHistory, "assistant", reply);

memory.chatHistory = chatHistory;
saveMemory(memory);

console.log("\nAI:", reply);
console.log();

} catch (err) {
  console.log("\nError:", err.message);
}
  }
}

main().catch(console.error);
