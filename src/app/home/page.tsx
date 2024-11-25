import ImgToText from "@/components/img-to-text";

export default function CustomHome() {
  return (
    <>
      <header className="flex justify-center">
        <h1>Convertir Imagen a Texto</h1>
      </header>
      <main className="w-[900px]">
        <ImgToText />
      </main>
    </>
  );
}
