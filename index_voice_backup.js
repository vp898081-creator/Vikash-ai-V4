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

async function main() {
  while (true) {
    const question = readline.question("Tum: ");

    if (question.toLowerCase() === "exit") {
      console.log("Bye!");
      break;
    }

    const commandReply = handleCommand(question, memory);

    if (commandReply) {
      saveMemory(memory);
      console.log("\nAI:", commandReply);
      continue;
    }

    addMessage(memory.chatHistory, "user", question);

    try {
      const reply = await askOpenRouter(apiKey, [
        {
          role: "system",
          content:
            "You are Vikash AI. Answer in Hindi. Remember user details."
        },
        ...memory.chatHistory
      ]);

      addMessage(memory.chatHistory, "assistant", reply);

      saveMemory(memory);

      console.log("\nAI:", reply);
      console.log();

    } catch (error) {
      console.log("\nError:", error.message);
    }
  }
}

main();
