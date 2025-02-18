import express from "express";
import cors from "cors";  // ✅ Import CORS
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for all origins (or specify allowed origins)
app.use(cors());

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMh--HEWIPrvxVbuJ7yl-JpgMCR8KRlUc",
  authDomain: "click-counter-api-42216.firebaseapp.com",
  databaseURL: "https://click-counter-api-42216-default-rtdb.firebaseio.com",
  projectId: "click-counter-api-42216",
  storageBucket: "click-counter-api-42216.firebasestorage.app",
  messagingSenderId: "209648397046",
  appId: "1:209648397046:web:b7110c8f0b9e091e0fdad7"
};

// ✅ Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

// ✅ Function to get database reference
const getRef = (postID, key) => ref(db, `counters/${postID}/${key}`);

// ✅ Get value
app.get("/api/get/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  try {
    const snapshot = await get(getRef(postID, key));
    res.json({ value: snapshot.exists() ? snapshot.val() : 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Increment value
app.get("/api/inc/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  try {
    const snapshot = await get(getRef(postID, key));
    const currentValue = snapshot.exists() ? snapshot.val() : 0;
    await set(getRef(postID, key), currentValue + 1);
    res.json({ message: "incremented", value: currentValue + 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Decrement value
app.get("/api/dec/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  try {
    const snapshot = await get(getRef(postID, key));
    const currentValue = snapshot.exists() ? snapshot.val() : 0;
    await set(getRef(postID, key), currentValue - 1);
    res.json({ message: "decremented", value: currentValue - 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Set a specific value
app.get("/api/set/:postID/:key/:value", async (req, res) => {
  const { postID, key, value } = req.params;
  try {
    await set(getRef(postID, key), parseInt(value));
    res.json({ message: `set to ${value}`, value: parseInt(value) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Reset value to 0
app.get("/api/reset/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  try {
    await set(getRef(postID, key), 0);
    res.json({ message: "reset to 0" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get info
app.get("/api/info/:postID/:key", async (req, res) => {
  const { postID, key } = req.params;
  try {
    const snapshot = await get(getRef(postID, key));
    res.json({
      namespace: postID,
      key: key,
      value: snapshot.exists() ? snapshot.val() : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
