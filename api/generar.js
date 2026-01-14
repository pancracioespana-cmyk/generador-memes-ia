import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST permitido" });
  }

  try {
    const { descripcion } = req.body;

    if (!descripcion) {
      return res.status(400).json({ error: "Falta descripción" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const image = await client.images.generate({
      model: "gpt-image-1",
      prompt: descripcion,
      size: "1024x1024"
    });

    res.status(200).json({
      imageUrl: image.data[0].url
    });

  } catch (error) {
    console.error("ERROR OPENAI:", error);
    res.status(500).json({
      error: "Error al generar la imagen",
      detalle: error.message
    });
  }
}
