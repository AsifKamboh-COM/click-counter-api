import express from "express";
import admin from "firebase-admin";
import fs from "fs";

// Initialize Firebase
const serviceAccount = JSON.parse(fs.readFileSync("./firebaseAdmin.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://click-counter-api-42216-default-rtdb.firebaseio.com/" // Replace with your Firebase Realtime Database URL
});

const db = admin.database();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Function to get a reference to a specific key
const getRef = (postID, key) => db.ref(`counters/${postID}/${key}`);

// ✅ Get current value
app.get("/api/get/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  const snapshot = await getRef(postID, key).once("value");
  res.json({ value: snapshot.val() || 0 });
});

// ✅ Increment value
app.get("/api/inc/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  const ref = getRef(postID, key);
  ref.transaction(value => (value || 0) + 1);
  res.json({ message: "incremented" });
});

// ✅ Decrement value
app.get("/api/dec/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  const ref = getRef(postID, key);
  ref.transaction(value => (value || 0) - 1);
  res.json({ message: "decremented" });
});

// ✅ Set a specific value
app.get("/api/set/:postID/:key/:value", async (req, res) => {
  const { postID, key, value } = req.params;
  await getRef(postID, key).set(parseInt(value));
  res.json({ message: `set to ${value}` });
});

// ✅ Reset value to 0
app.get("/api/reset/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  await getRef(postID, key).set(0);
  res.json({ message: "reset to 0" });
});

// ✅ Get info
app.get("/api/info/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  const snapshot = await getRef(postID, key).once("value");
  res.json({
    namespace: postID,
    key: key,
    value: snapshot.val() || 0
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
