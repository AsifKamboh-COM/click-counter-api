// app.js
const express = require("express");
const app = express();
const port = 3000;

// In-memory storage for counters
let counters = {};

// Middleware to parse JSON
app.use(express.json());

// Function to initialize counters if not present
function initializeCounter(postId, key) {
  if (!counters[postId]) {
    counters[postId] = {};
  }
  if (!counters[postId][key]) {
    counters[postId][key] = 0;
  }
}

// Get current count
app.get("/api/get/:postId/:key", (req, res) => {
  const { postId, key } = req.params;
  initializeCounter(postId, key);
  res.json({
    namespace: postId,
    key: key,
    value: counters[postId][key],
  });
});

// Increment count
app.get("/api/inc/:postId/:key", (req, res) => {
  const { postId, key } = req.params;
  initializeCounter(postId, key);
  counters[postId][key]++;
  res.json({
    namespace: postId,
    key: key,
    value: counters[postId][key],
  });
});

// Decrement count
app.get("/api/dec/:postId/:key", (req, res) => {
  const { postId, key } = req.params;
  initializeCounter(postId, key);
  counters[postId][key]--;
  res.json({
    namespace: postId,
    key: key,
    value: counters[postId][key],
  });
});

// Set specific value for count
app.get("/api/set/:postId/:key/:value", (req, res) => {
  const { postId, key, value } = req.params;
  initializeCounter(postId, key);
  counters[postId][key] = parseInt(value);
  res.json({
    namespace: postId,
    key: key,
    value: counters[postId][key],
  });
});

// Reset count to 0
app.get("/api/reset/:postId/:key", (req, res) => {
  const { postId, key } = req.params;
  initializeCounter(postId, key);
  counters[postId][key] = 0;
  res.json({
    namespace: postId,
    key: key,
    value: counters[postId][key],
  });
});

// Get information about the key (meta info)
app.get("/api/info/:postId/:key", (req, res) => {
  const { postId, key } = req.params;
  initializeCounter(postId, key);
  res.json({
    namespace: postId,
    key: key,
    value: counters[postId][key],
  });
});

// Default route to check if the app is working
app.get("/", (req, res) => {
  res.send("Click Counter API is running!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
