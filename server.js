require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/get-signup-message", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Generate a random signup confirmation message for a new user:",
        },
      ],
      max_tokens: 50,
    });
    res.json({ message: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get signup message from GPT" });
  }
});
app.post("/get-login-message", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Generate a random login confirmation message for a user:",
        },
      ],
      max_tokens: 50,
    });
    res.json({ message: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get login message from GPT" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
