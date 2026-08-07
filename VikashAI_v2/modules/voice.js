const { execSync } = require("child_process");

function listenVoice() {
  try {
    const text = execSync("termux-speech-to-text", {
      encoding: "utf8",
      timeout: 30000
    }).trim();

    // Android Speech Recognition errors
    if (
      !text ||
      text.startsWith("ERROR:")
    ) {
      return "";
    }

    return text;
  } catch (err) {
    return "";
  }
}

module.exports = {
  listenVoice
};
