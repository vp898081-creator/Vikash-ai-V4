const { listenVoice } = require("./voice");

const WAKE_WORDS = [
  "hey vikash",
  "he vikas",
  "hey vikas",
  "hi vikash",
  "hi vikas",
  "vikash",
  "vikas"
];

function checkWakeWord() {
  const text = listenVoice().toLowerCase();

  if (!text) {
    return false;
  }

  console.log("🎤 Suna:", text);

  return WAKE_WORDS.some(word => text.includes(word));
}

module.exports = {
  checkWakeWord
};
