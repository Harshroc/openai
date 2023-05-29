const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

router.post("/", async function (req, res, next) {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const body = req.body;
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: process.env.OPEN_AI_MODEL,
    prompt: body.message,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: [" Human:", " AI:"],
  });
  const final_response = response.data.choices[0].text;
  res.send(final_response);
});

module.exports = router;
