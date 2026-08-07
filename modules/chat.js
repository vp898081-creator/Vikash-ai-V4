function addMessage(chatHistory, role, content) {
  chatHistory.push({
    role,
    content
  });

  // सिर्फ़ आख़िरी 20 मैसेज रखें
  if (chatHistory.length > 20) {
    chatHistory.splice(0, chatHistory.length - 20);
  }
}

module.exports = {
  addMessage
};
