"use server";

import { OpenAI } from "openai";

// Inicializa el cliente de OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Configura tu API Key en un archivo .env
  dangerouslyAllowBrowser: true,
});

/**
 * Analiza el contenido de una imagen en Base64 usando OpenAI GPT.
 * @param base64Image - String en formato Base64 de la imagen.
 * @returns Promesa con la respuesta de la IA.
 */
export async function analyzeImageFromBase64(
  base64Image: string,
): Promise<string> {
  if (!base64Image) {
    throw new Error("El string en Base64 es requerido.");
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
       /* {
          role: "system",
          content: [
            {
              type: "text",
              text: "return the text that requires the user, nothing else",
            },
          ],
        },
	*/
        {
          role: "user",
          content: JSON.stringify([
            { type: "text", text: "Extraer texto de esta imagen" },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ]),
        },
      ],
    });

    console.log(response.choices[0]?.message);
    // Retorna la respuesta
    return response.choices[0]?.message?.content || "No hay respuesta de la IA";
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "Failed to analyze the image. ";
  }
}
