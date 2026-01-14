import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { descripcion } = req.body;

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt: descripcion,
      size: "1024x1024",
    });

    res.status(200).json({
      imageUrl: image.data[0].url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error generando la imagen",
      detalle: error.message,
    });
  }
}
