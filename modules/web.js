async function webSearch(query) {
  const url =
    "https://www.google.com/search?q=" +
    encodeURIComponent(query);

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/131 Mobile Safari/537.36"
    }
  });

  if (!response.ok) {
    throw new Error(`Web search failed: ${response.status}`);
  }

  const html = await response.text();

  // Basic text extraction from search result page
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

  return text.slice(0, 8000);
}

module.exports = {
  webSearch
};
