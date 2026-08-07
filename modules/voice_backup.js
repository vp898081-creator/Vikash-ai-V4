const { execSync } = require("child_process");

function listenVoice() {
  try {
    const text = execSync("termux-speech-to-text", {
      encoding: "utf8"
    });

    return text.trim();
  } catch (err) {
    return "";
  }
}

module.exports = {
  listenVoice
};
