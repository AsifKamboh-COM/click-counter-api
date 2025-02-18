const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// File where counter data will be stored
const DATA_FILE = "./counters.json";

// Load counter data from file (or create an empty object if file doesn't exist)
let counters = {};
if (fs.existsSync(DATA_FILE)) {
    counters = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Function to save counters to file
function saveCounters() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(counters, null, 2));
}

// Function to initialize a counter if it does not exist
function initializeCounter(postId, key) {
    if (!counters[postId]) {
        counters[postId] = {};
    }
    if (!counters[postId][key]) {
        counters[postId][key] = 0;
        saveCounters(); // Save the initial value
    }
}

// Get current count
app.get("/api/get/:postId/:key", (req, res) => {
    const { postId, key } = req.params;
    initializeCounter(postId, key);
    res.json({ value: counters[postId][key] });
});

// Increment count
app.get("/api/inc/:postId/:key", (req, res) => {
    const { postId, key } = req.params;
    initializeCounter(postId, key);
    counters[postId][key]++;
    saveCounters();
    res.json({ increment: { value: counters[postId][key] } });
});

// Decrement count
app.get("/api/dec/:postId/:key", (req, res) => {
    const { postId, key } = req.params;
    initializeCounter(postId, key);
    counters[postId][key]--;
    saveCounters();
    res.json({ decrement: { value: counters[postId][key] } });
});

// Set specific value for count
app.get("/api/set/:postId/:key/:value", (req, res) => {
    const { postId, key, value } = req.params;
    initializeCounter(postId, key);
    counters[postId][key] = parseInt(value);
    saveCounters();
    res.json({ set: { value: counters[postId][key] } });
});

// Reset count to 0
app.get("/api/reset/:postId/:key", (req, res) => {
    const { postId, key } = req.params;
    initializeCounter(postId, key);
    counters[postId][key] = 0;
    saveCounters();
    res.json({ reset: { value: counters[postId][key] } });
});

// Get information about the key (meta info)
app.get("/api/info/:postId/:key", (req, res) => {
    const { postId, key } = req.params;
    initializeCounter(postId, key);
    res.json({
        namespace: postId,
        key: key,
        value: counters[postId][key]
    });
});

// Default route
app.get("/", (req, res) => {
    res.send("Click Counter API is running!");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
