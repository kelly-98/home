const rateLimit = require("express-rate-limit");
const express = require("express");
const openai = require("openai");
const cors = require("cors");
require("dotenv").config();

const { Configuration, OpenAIApi } = openai;

const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 1,
  message: "Too many requests, please try again later",
});

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://generator.fonai.app/"],
  })
);
app.use(limiter);
app.use(express.json());

const port = 8000;

const key = process.env.OPENAI_API_KEY;

app.post("/generate", async (req, res) => {
  const string = req.body.prompt;
  var data = await generate(string);
  res.send(data);
});

async function generate(prompt) {
  const configuration = new Configuration({
    apiKey: key,
  });

  const openaiApi = new OpenAIApi(configuration);
  try {
    const response = await openaiApi.createImage({
      prompt: prompt,
      n: 6,
      size: "512x512",
    });
    return response.data.data;
  } catch (error) {
    return "Service unavailable, try again later!";
  }
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
