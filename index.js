require("dotenv").config();

const readline = require("readline-sync");

const { loadMemory, saveMemory } = require("./modules/memory");
const { handleCommand } = require("./modules/commands");
const { askOpenRouter } = require("./modules/openrouter");
const { addMessage } = require("./modules/chat");
const { listenVoice } = require("./modules/voice");
const { checkWakeWord } = require("./modules/wake");
const { speak } = require("./modules/speaker");

const apiKey = process.env.OPENROUTER_API_KEY;

let memory = loadMemory();

if (!memory.chatHistory) {
  memory.chatHistory = [];
}

async function processQuestion(question) {

  if (!question) return;

  console.log("\nAap:", question);

  if (question.toLowerCase() === "exit") {
    console.log("Bye!");
    process.exit(0);
  }

  const commandReply = handleCommand(question, memory);

  if (commandReply) {
    saveMemory(memory);
    console.log("\nAI:", commandReply);
    speak(commandReply);
    return;
  }

  addMessage(memory.chatHistory, "user", question);

  try {

    const reply = await askOpenRouter(apiKey, [
      {
        role: "system",
        content:
          "You are Vikash AI. Reply only in Hindi unless the user requests another language."
      },
      ...memory.chatHistory
    ]);

    addMessage(memory.chatHistory, "assistant", reply);

    saveMemory(memory);

    console.log("\nAI:", reply);

    speak(reply);

  } catch (err) {

    console.log("\nError:", err.message);

  }
}

async function typingMode() {

  const question = readline.question(
    "Tum: "
  );

  await processQuestion(question);

}
async function wakeMode() {

  console.log("\n🎤 Wake mode chalu hai...");
  console.log("Boliye: Hey Vikash");

  while (true) {

    const wake = checkWakeWord();

    if (!wake) {
      continue;
    }

    console.log("\n🤖 Haan Vikash, boliye...");
    speak("Haan Vikash, boliye");

    const question = listenVoice();

    if (!question) {
      console.log("❌ Kuch samajh nahi aaya.");
      continue;
    }

    await processQuestion(question);

    console.log("\n🔄 Wapas Wake Mode...");
  }
}

async function main() {

  console.log("==================================");
  console.log("      Vikash AI v3 Started");
  console.log("==================================");

  while (true) {

    console.log("\n1. Type Mode");
    console.log("2. Wake Mode");
    console.log("3. Exit");

    const choice = readline.question("Choose: ");

    if (choice === "1") {

      await typingMode();

    } else if (choice === "2") {

      await wakeMode();

    } else if (choice === "3") {

      console.log("Bye!");
      process.exit(0);

    } else {

      console.log("❌ Invalid option.");

    }
  }
}

main().catch(err => {
  console.error(err);
});
