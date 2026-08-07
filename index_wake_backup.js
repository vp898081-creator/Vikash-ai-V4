require("dotenv").config();

const readline = require("readline-sync");
const { exec } = require("child_process");

const { loadMemory, saveMemory } = require("./modules/memory");
const { handleCommand } = require("./modules/commands");
const { askOpenRouter } = require("./modules/openrouter");
const { addMessage } = require("./modules/chat");
const { listenVoice } = require("./modules/voice");

const apiKey = process.env.OPENROUTER_API_KEY;

let memory = loadMemory();

if (!memory.chatHistory) {
  memory.chatHistory = [];
}

function speak(text) {
  exec(`termux-tts-speak "${text.replace(/"/g, '\\"')}"`);
}

async function main() {

  while (true) {

    let question = readline.question(
      "Tum (type karo ya Enter dabao voice ke liye): "
    );

    if (question.trim() === "") {
      question = listenVoice();
      console.log("Aap:", question);
    }

    if (!question) {
      continue;
    }

    if (question.toLowerCase() === "exit") {
      console.log("Bye!");
      break;
    }

    const commandReply = handleCommand(question, memory);

    if (commandReply) {
      saveMemory(memory);
      console.log("\nAI:", commandReply);
      speak(commandReply);
      continue;
    }

    addMessage(memory.chatHistory, "user", question);

    try {

      const reply = await askOpenRouter(apiKey, [
        {
          role: "system",
          content: "You are Vikash AI. Answer in Hindi."
        },
        ...memory.chatHistory
      ]);

      addMessage(memory.chatHistory, "assistant", reply);

      saveMemory(memory);

      console.log("\nAI:", reply);
      speak(reply);

    } catch (error) {
      console.log("\nError:", error.message);
    }
  }
}

main();
