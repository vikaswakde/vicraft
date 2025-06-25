import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  // Rate limiting logic
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  console.log(ip);

  // Check if the user's IP is in the allowlist
  const allowlist = (process.env.IP_ALLOWLIST || "").split(",").map(item => item.trim());
  
  if (!allowlist.includes(ip)) {
    const ratelimitKey = `pocket-ai-ratelimit:${ip}`;
    const currentUsage = await redis.get(ratelimitKey);

    if (currentUsage && Number(currentUsage) >= 3) {
      return new Response(
        "bro i am api credits poor, if you are enjoying this, please dm me on x.com/vikaswakde42",
        { status: 429 }
      );
    }
  }

  try {
    const { messages, model } = await req.json();

    // Check if API key is available
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key is not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const openrouter = createOpenRouter({
      apiKey,
    });

    // Use the model passed from the frontend or default to Gemma
    const selectedModel = model || "google/gemma-3-12b-it:free";

    const result = await streamText({
      model: openrouter.chat(selectedModel),
      messages,
      system:
        "You are a pocket ai, a helpful assistant that can answer questions in very short and concise answers that are human readable, fit in a pocket card, and are humorus in nature. dont use too much of emojis.",
      onFinish: async () => {
        if (!allowlist.includes(ip)) {
          // Increment usage count after successful API call only if not in allowlist
          const ratelimitKey = `pocket-ai-ratelimit:${ip}`;
          const newUsage = await redis.incr(ratelimitKey);
          if (newUsage === 1) {
            // Set an expiration for the key if it's the first time
            await redis.expire(ratelimitKey, 60 * 60 * 24); // 24 hours
          }
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error: unknown) {
    console.error("Error in chat API:", error);
    // Return a generic error response
    return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 