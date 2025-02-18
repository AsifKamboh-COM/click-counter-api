import { createClient } from "redis";

const client = createClient({
  url: "rediss://default:AUCXAAIjcDFjMGE0NTEyYTg4MzY0NzY0YTJmOTNiM2IyMWEyOGJhYXAxMA@crucial-gorilla-16535.upstash.io:6379"
});

client.on("error", (err) => console.error("Redis Client Error", err));

export default async function handler(req, res) {
  await client.connect();
  const { namespace, key } = req.query;
  const redisKey = `${namespace}:${key}`;
  await client.set(redisKey, 0);
  await client.quit();
  res.json({ message: "reset", value: 0 });
}
