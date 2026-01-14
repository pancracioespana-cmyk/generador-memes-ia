import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const prompt = req.body.prompt;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    res.status(200).json({ url: result.data[0].url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando imagen" });
  }
}
