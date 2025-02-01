const GEMINI_API_KEY = 'AIzaSyD_rFjX_j2IJ-rodZ1UW4EsNqM4UdPG2pA';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const MAX_REQUESTS = 5;
const REQUEST_INTERVAL = 1000; // 1 request per second
const RESET_TIME = 120000; // 2 minutes in milliseconds

let requestCount = 0;
let lastRequestTime = 0;

// Function to reset request count after 2 minutes
const resetRequestCount = () => {
  setTimeout(() => {
    requestCount = 0;
    console.log('Request limit reset after 2 minutes.');
  }, RESET_TIME);
};

export const generateCardContent = async (topic) => {
  try {
    // Check if the request limit is reached
    if (requestCount >= MAX_REQUESTS) {
      return 'Request limit reached (10/10). Please try again after 2 minutes.';
    }

    // Start/reset the countdown when the first request is made
    if (requestCount === 0) {
      resetRequestCount();
    }

    // Wait to ensure requests are spaced out
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < REQUEST_INTERVAL) {
      await new Promise((resolve) => setTimeout(resolve, REQUEST_INTERVAL - timeSinceLastRequest));
    }

    lastRequestTime = Date.now(); // Update last request timestamp

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `Generate a short and interesting fact about ${topic} in 2-3 sentences.` }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('API Error Response:', errorResponse);

      // Handle 429 Too Many Requests
      if (response.status === 429) {
        return 'API is temporarily rate-limited. Please try again later.';
      }

      throw new Error(`Failed to fetch data from Gemini API: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    requestCount++; // Increase request count

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating card content:', error);
    return 'Failed to generate content. Please try again.';
  }
};
