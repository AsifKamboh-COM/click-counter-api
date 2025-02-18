import express from "express";
import { createClient } from "redis";

const app = express();
const port = 3000;

// Create Redis client
const client = createClient({
  url: "rediss://default:AUCXAAIjcDFjMGE0NTEyYTg4MzY0NzY0YTJmOTNiM2IyMWEyOGJhYXAxMA@crucial-gorilla-16535.upstash.io:6379",
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

await client.connect();

// Function to initialize key if it doesn't exist
async function initializeKey(postId, key) {
  const fullKey = `${postId}:${key}`;
  const value = await client.get(fullKey);
  if (value === null) {
    await client.set(fullKey, 0);
  }
}

// Get count
app.get("/api/get/:postId/:key", async (req, res) => {
  const { postId, key } = req.params;
  await initializeKey(postId, key);
  const value = await client.get(`${postId}:${key}`);
  res.json({ value: parseInt(value) });
});

// Increment count
app.get("/api/inc/:postId/:key", async (req, res) => {
  const { postId, key } = req.params;
  await initializeKey(postId, key);
  const value = await client.incr(`${postId}:${key}`);
  res.json({ increment: { value } });
});

// Decrement count
app.get("/api/dec/:postId/:key", async (req, res) => {
  const { postId, key } = req.params;
  await initializeKey(postId, key);
  const value = await client.decr(`${postId}:${key}`);
  res.json({ decrement: { value } });
});

// Set count to specific value
app.get("/api/set/:postId/:key/:value", async (req, res) => {
  const { postId, key, value } = req.params;
  await client.set(`${postId}:${key}`, parseInt(value));
  res.json({ set: { value: parseInt(value) } });
});

// Reset count to 0
app.get("/api/reset/:postId/:key", async (req, res) => {
  const { postId, key } = req.params;
  await client.set(`${postId}:${key}`, 0);
  res.json({ reset: { value: 0 } });
});

// Get info about key
app.get("/api/info/:postId/:key", async (req, res) => {
  const { postId, key } = req.params;
  await initializeKey(postId, key);
  const value = await client.get(`${postId}:${key}`);
  res.json({ namespace: postId, key: key, value: parseInt(value) });
});

// Start Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
