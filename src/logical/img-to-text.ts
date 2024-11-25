import Tesseract from "tesseract.js";

export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const processImage = async (base64String: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.src = base64String;

      img.onload = () => {
        Tesseract.recognize(img, "spa")
          .then((result) => {
            resolve(result.data.text);
          })
          .catch((error: any) => {
            reject(`Error al procesar la imagen: ${error.message}`);
          });
      };

      img.onerror = (error) => {
        reject(`Error al cargar la imagen: ${error}`);
      };
    } catch (error: any) {
      reject(`Error general: ${error.message}`);
    }
  });
};
