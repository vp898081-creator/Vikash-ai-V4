async function askOpenRouter(apiKey, messages) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: messages,
        max_tokens: 500
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(JSON.stringify(data.error));
  }

  return data.choices[0].message.content;
}

module.exports = {
  askOpenRouter
};
