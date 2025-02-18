const express = require("express");
const Redis = require("ioredis");

const app = express();
const port = 3000;

const redis = new Redis(process.env.UPSTASH_REDIS_URL);

// Get count
app.get("/api/get/:postId/:key", async (req, res) => {
    const { postId, key } = req.params;
    const value = await redis.get(`${postId}:${key}`) || 0;
    res.json({ value: parseInt(value) });
});

// Increment count
app.get("/api/inc/:postId/:key", async (req, res) => {
    const { postId, key } = req.params;
    const value = await redis.incr(`${postId}:${key}`);
    res.json({ increment: { value } });
});

// Decrement count
app.get("/api/dec/:postId/:key", async (req, res) => {
    const { postId, key } = req.params;
    const value = await redis.decr(`${postId}:${key}`);
    res.json({ decrement: { value } });
});

// Set count
app.get("/api/set/:postId/:key/:value", async (req, res) => {
    const { postId, key, value } = req.params;
    await redis.set(`${postId}:${key}`, value);
    res.json({ set: { value: parseInt(value) } });
});

// Reset count
app.get("/api/reset/:postId/:key", async (req, res) => {
    const { postId, key } = req.params;
    await redis.set(`${postId}:${key}`, 0);
    res.json({ reset: { value: 0 } });
});

// Get info
app.get("/api/info/:postId/:key", async (req, res) => {
    const { postId, key } = req.params;
    const value = await redis.get(`${postId}:${key}`) || 0;
    res.json({ namespace: postId, key: key, value: parseInt(value) });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
