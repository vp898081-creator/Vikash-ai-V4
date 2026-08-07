const { exec } = require("child_process");

function speak(text) {
  if (!text) return;

  // डबल कोट्स को escape करें ताकि command न टूटे
  const safeText = text.replace(/"/g, '\\"');

  exec(`termux-tts-speak "${safeText}"`, (err) => {
    if (err) {
      console.log("TTS Error:", err.message);
    }
  });
}

module.exports = {
  speak
};
