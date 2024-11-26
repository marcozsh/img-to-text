"use client";

import { useState } from "react";
import { toBase64, processImage } from "@/logical/img-to-text";
import { Button, CircularProgress } from "@nextui-org/react";
import { copyToClipboard } from "@/logical/utils";
import toast from "react-hot-toast";

export default function ImgToText() {
  const [inputValue, setInputValue] = useState<string>("");

  const [showLoading, setLoading] = useState<boolean>(false);

  const dropFunction = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const ImgToBs64Drop = async (event: React.DragEvent<HTMLDivElement>) => {
    setLoading(true);
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image")) {
        const base64String = await toBase64(file);
        const extractedText = await processImage(base64String);
        setInputValue(extractedText);
      } else {
        toast.error("Archivo no corresponde a una imagen");
      }
    }
    setLoading(false);
  };

  const ImgToBs64Paste = async (
    event: React.ClipboardEvent<HTMLDivElement>,
  ) => {
    setLoading(true);
    const items = event.clipboardData.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith("image")) {
          const file = item.getAsFile();
          if (file) {
            const base64String = await toBase64(file);
            console.log(base64String);
            let extractedText = await processImage(base64String);
            if (extractedText.length <= 0) {
              extractedText = "Imagen sin texto para extraer";
            }
            setInputValue(extractedText);
          }
        } else {
          toast.error("Lo copiado no corresponde a una imagen");
        }
      }
    }
    setLoading(false);
  };

  return (
    <>
      <section className="flex flex-col gap-12 pb-2 w-[1000px]">
        <div
          className="flex items-center justify-center mt-32 w-full h-96 border-2 rounded-md border-primary"
          onPaste={ImgToBs64Paste}
          onDrop={ImgToBs64Drop}
          onDragOver={dropFunction}
        >
          <p>Pega o Arrastra una Imagen Aquí</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {inputValue != "" ? (<p>Resultado: </p>) : ""}
	  {inputValue}
          {showLoading && <CircularProgress label="Cargando" color="danger" />}
          {inputValue != "" ? (
            <Button
              color="danger"
              onClick={() =>
                copyToClipboard(inputValue).then(() =>
                  toast.success("texto copiado"),
                )
              }
            >
              Copiar al clipboard
            </Button>
          ) : (
            ""
          )}
          {inputValue != "" ? (
            <Button color="danger" onClick={() => setInputValue("")}>
              Empezar de nuevo
            </Button>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}
