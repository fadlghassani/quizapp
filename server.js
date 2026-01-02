const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve Flutter Web build
app.use(express.static(path.join(__dirname, "public")));

// Proxy endpoint
app.get("/api/get_questions", async (req, res) => {
  try {
    const response = await fetch(
      "https://thinkglobal.gt.tc/quiz_api/get_questions.php"
    );
    const data = await response.text(); // or response.json() if JSON
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch API" });
  }
});

// Flutter Web fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
