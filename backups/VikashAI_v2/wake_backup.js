const { listenVoice } = require("./voice");

function checkWakeWord() {
  const text = listenVoice().toLowerCase();

  console.log("Suna:", text);

  if (!text) {
    return false;
  }

  return (
    text.includes("hey vikash") ||
    text.includes("he vikas") ||
    text.includes("hey vikas")
  );
}

module.exports = {
  checkWakeWord
};
