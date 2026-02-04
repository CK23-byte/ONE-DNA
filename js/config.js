/**
 * ONE-DNA™ Chatbot Configuration
 *
 * SECURITY WARNING:
 * In production, NEVER expose API keys client-side!
 * Use a serverless function (Vercel, Netlify, AWS Lambda) or backend proxy.
 *
 * For development/demo purposes only:
 * Set your OpenAI API key below or use environment variables.
 */

// Development configuration - Replace with your API key for testing
// In production, this should be handled by a backend service
window.__OPENAI_KEY__ = 'YOUR_API_KEY_HERE';

/**
 * Production setup options:
 *
 * 1. Vercel Serverless Function:
 *    - Create /api/chat.js endpoint
 *    - Store OPENAI_API_KEY in Vercel environment variables
 *    - Call your own API endpoint instead of OpenAI directly
 *
 * 2. Netlify Functions:
 *    - Create /.netlify/functions/chat.js
 *    - Store OPENAI_API_KEY in Netlify environment variables
 *
 * 3. Cloudflare Workers:
 *    - Create a Worker that proxies requests to OpenAI
 *    - Store API key in Workers secrets
 *
 * Example backend proxy endpoint:
 *
 * // /api/chat.js (Vercel)
 * export default async function handler(req, res) {
 *   const { messages } = req.body;
 *
 *   const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
 *     },
 *     body: JSON.stringify({
 *       model: 'gpt-4o-mini',
 *       messages,
 *       max_tokens: 500
 *     })
 *   });
 *
 *   const data = await response.json();
 *   res.json(data);
 * }
 */
