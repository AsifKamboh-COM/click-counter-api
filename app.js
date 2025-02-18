const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const DATA_FILE = path.join(__dirname, "counters.json");

// Ensure the file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2));
}

// Load counter data from file
let counters = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

// Function to save counters safely
function saveCounters() {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(counters, null, 2));
    } catch (error) {
        console.error("Error saving counters:", error);
    }
}

// Function to initialize a counter if it does not exist
function initializeCounter(postId, key) {
    if (!counters[postId]) {
        counters[postId] = {};
    }
    if (!counters[postId][key]) {
        counters[postId][key] = 0;
        saveCounters();
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

// Get information about the key
app.get("/api/info/:postId/:key", (req, res) => {
    const { postId, key } = req.params;
    initializeCounter(postId, key);
    res.json({ namespace: postId, key: key, value: counters[postId][key] });
});

// Default route
app.get("/", (req, res) => {
    res.send("Click Counter API is running!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
