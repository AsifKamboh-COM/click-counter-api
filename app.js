import express from "express";
import { createClient } from "redis";

const app = express();
const port = process.env.PORT || 3000;

// Redis client configuration
const client = createClient({
  url: "rediss://default:AUCXAAIjcDFjMGE0NTEyYTg4MzY0NzY0YTJmOTNiM2IyMWEyOGJhYXAxMA@crucial-gorilla-16535.upstash.io:6379"
});

client.on("error", (err) => console.error("Redis Client Error", err));

await client.connect();

// Middleware
app.use(express.json());

// Helper function to get Redis key
const getKey = (namespace, key) => `${namespace}:${key}`;

// Get the current count
app.get("/api/get/:namespace/:key", async (req, res) => {
  const { namespace, key } = req.params;
  const redisKey = getKey(namespace, key);
  const value = await client.get(redisKey) || 0;
  res.json({ value: parseInt(value) });
});

// Increment count
app.get("/api/inc/:namespace/:key", async (req, res) => {
  const { namespace, key } = req.params;
  const redisKey = getKey(namespace, key);
  const value = await client.incr(redisKey);
  res.json({ message: "increment", value });
});

// Decrement count
app.get("/api/dec/:namespace/:key", async (req, res) => {
  const { namespace, key } = req.params;
  const redisKey = getKey(namespace, key);
  const value = await client.decr(redisKey);
  res.json({ message: "decrement", value });
});

// Set count to a specific value
app.get("/api/set/:namespace/:key/:value", async (req, res) => {
  const { namespace, key, value } = req.params;
  const redisKey = getKey(namespace, key);
  await client.set(redisKey, value);
  res.json({ message: "set", value: parseInt(value) });
});

// Reset count to 0
app.get("/api/reset/:namespace/:key", async (req, res) => {
  const { namespace, key } = req.params;
  const redisKey = getKey(namespace, key);
  await client.set(redisKey, 0);
  res.json({ message: "reset", value: 0 });
});

// Get all info about a key
app.get("/api/info/:namespace/:key", async (req, res) => {
  const { namespace, key } = req.params;
  const redisKey = getKey(namespace, key);
  const value = await client.get(redisKey) || 0;
  res.json({ namespace, key, value: parseInt(value) });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Invalid API route" });
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
