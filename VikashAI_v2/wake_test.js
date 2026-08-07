const { checkWakeWord } = require("./modules/wake");

console.log("Boliye: Hey Vikash");

const result = checkWakeWord();

if (result) {
  console.log("Wake word mil gaya!");
} else {
  console.log("Wake word nahi mila.");
}
