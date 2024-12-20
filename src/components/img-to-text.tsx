"use client";

import { useEffect, useState } from "react";
import { toBase64, processImage } from "@/logical/img-to-text";
import { FiCopy } from "react-icons/fi";
import {
  Button,
  CircularProgress,
  Input,
  //Switch,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { copyToClipboard } from "@/logical/utils";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { saveLog } from "@/logical/server-querys";
//import { analyzeImageFromBase64 } from "@/logical/ai-analyze";

export default function ImgToText() {
  const [inputValue, setInputValue] = useState<string>("");

  const [fileName, setFileName] = useState<string>("Sube un archivo");

  const [showLoading, setLoading] = useState<boolean>(false);

  //const [isAiDetectionSelected, setAiDetectionSelected] = useState<boolean>(false);

  const [isInputSelected, setInputSelected] = useState<boolean>(true);

  //const setAiDetectionSelectedNotLogIn = () => {toast("Para usar esa función debes iniciar sesión"); // todo: add cloud vision from google to ai recognition};

  useEffect(() => {
    setInputSelected(true);
  }, []);

  const { data: session } = useSession();

  const dropFunction = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const ImgToBs64Drop = async (event: React.DragEvent<HTMLDivElement>) => {
    if (!showLoading) {
      setLoading(true);
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image")) {
          setInputSelected(false);
          const base64String = await toBase64(file);
          let extractedText = await processImage(base64String);
          if (extractedText.length > 0) {
            setInputValue(extractedText);

            if (session?.user) {
              await saveLog(
                session.user.name || "",
                session.user.email || "",
                extractedText,
                "droped",
              );
            }
          } else {
            toast.error("Imagen sin texto para extraer");
          }
        } else {
          toast.error("Archivo no corresponde a una imagen");
          setInputSelected(true);
        }
      }
      setLoading(false);
    }
  };

  const ImgToBs64Paste = async (
    event: React.ClipboardEvent<HTMLDivElement>,
  ) => {
    if (!showLoading) {
      setLoading(true);
      const items = event.clipboardData.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.startsWith("image")) {
            setInputSelected(false);
            const file = item.getAsFile();
            if (file) {
              const base64String = await toBase64(file);
              let extractedText = "";
              extractedText = await processImage(base64String);
              //if (isAiDetectionSelected) {
              //extractedText = await analyzeImageFromBase64(base64String);
              //} else {
              //}
              if (extractedText.length > 0) {
                setInputValue(extractedText);
                if (session?.user) {
                  await saveLog(
                    session.user.name || "",
                    session.user.email || "",
                    extractedText,
                    "pasted",
                  );
                }
              } else {
                toast.error("Imagen sin texto para extraer");
              }
            }
          } else {
            toast.error("Lo copiado no corresponde a una imagen");
            setInputSelected(true);
          }
        }
      }
      setLoading(false);
    }
  };

  const handleOnChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!showLoading) {
      setLoading(true);
      const file = event.target.files?.[0];
      if (file) {
        if (file.type.startsWith("image")) {
          setInputSelected(false);
          setFileName(file.name);
          const base64String = await toBase64(file);
          let extractedText = await processImage(base64String);
          if (extractedText.length > 0) {
            setInputValue(extractedText);
            if (session?.user) {
              await saveLog(
                session.user.name || "",
                session.user.email || "",
                extractedText,
                "file uploaded",
              );
            }
          } else {
            toast.error("Imagen sin texto para extraer");
          }
        } else {
          toast.error("El archivo subido no es una imagen");
          setInputSelected(true);
        }
      }
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-7 pb-3 w-[90%] md:w-[700px] lg:w-[1000px] mt-24">
        {/*mt-24 with ai switch is active
        <div className="z-10 justify-start lg:justify-end hidden">
          <Switch
            isSelected={isAiDetectionSelected}
            onValueChange={
              //session ? setAiDetectionSelected : setAiDetectionSelectedNotLogIn
              setAiDetectionSelectedNotLogIn
            }
            color="primary"
          >
            <span className="dark:text-white text-primary">
              Reconocimiento con IA
            </span>
          </Switch>
        </div>
	*/}

        <Tooltip
          placement="bottom-start"
          showArrow={true}
          isDisabled={!isInputSelected}
          content={
            <div className="px-1 py-2">
              <div className="text-small font-bold">Atención</div>
              <div className="text-tiny">
                Es probable que si adjunta una imagen sin texto, el resultado no
                sea el esperado
              </div>
            </div>
          }
        >
          <div
            className={`dark:bg-background flex flex-col items-center justify-center w-full h-96 border-2 rounded-md ${
              isInputSelected && `border-primary`
            }`}
            onPaste={(event) => isInputSelected && ImgToBs64Paste(event)}
            onDrop={(event) => isInputSelected && ImgToBs64Drop(event)}
            onDragOver={(event) => isInputSelected && dropFunction(event)}
          >
            <div className="text-center mb-10">
              <p className="pb-4">Pega o Arrastra una Imagen Aquí o</p>
              <div
                className={`border h-[90%] rounded-md dark:hover:transition-colors dark:hover:duration-300 dark:hover:ease-in-out ${
                  isInputSelected && `border-primary hover:bg-primary`
                }`}
              >
                <Input
                  id="upload-file"
                  type="file"
                  placeholder="sube un archivo"
                  label="Sube un archivo"
                  className="hidden"
                  onChange={(event) =>
                    isInputSelected && handleOnChangeFile(event)
                  }
                />

                <button
                  className="w-full h-full"
                  onClick={() =>
                    isInputSelected &&
                    document.getElementById("upload-file")?.click()
                  }
                >
                  {fileName}
                </button>
              </div>
            </div>
          </div>
        </Tooltip>
        <div>
          <div className="flex flex-row justify-end gap-2">
            {inputValue != "" ? (
              <Button
                color="danger"
                onClick={() => {
                  setInputValue("");
                  setFileName("Sube un archivo");
                  setInputSelected(true);
                }}
              >
                Empezar de nuevo
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="pt-4">
            {inputValue != "" ? (
              <>
                <p className="pb-2">
                  Resultado<span className="text-primary">:</span>
                </p>
                <div className="flex flex-row justify-end">
                  <Tooltip content={"copiar al clipboard"}>
                    <div className="m-4 absolute z-10 cursor-pointer">
                      <FiCopy
		      className="text-primary"
                        onClick={() =>
                          copyToClipboard(inputValue).then(() =>
                            toast.success("texto copiado"),
                          )
                        }
                      />
                    </div>
                  </Tooltip>
                  <Textarea value={inputValue} variant="faded" />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-center pt-4">
            {showLoading && (
              <CircularProgress label="Cargando" color="danger" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
