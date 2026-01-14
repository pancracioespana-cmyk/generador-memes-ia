import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt vacío" });
    }

    console.log("🧠 Generando imagen con prompt:", prompt);

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    const imageUrl = result.data[0].url;

    return res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("❌ Error en /api/generar:", error);
    return res.status(500).json({ error: "Error generando la imagen" });
  }
}
