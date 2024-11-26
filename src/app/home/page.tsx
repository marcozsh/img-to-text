import CustomNavBar from "@/components/custom-nav-bar";
import Footer from "@/components/footer";
import ImgToText from "@/components/img-to-text";
import Separator from "@/components/separator";

export default function CustomHome() {
  return (
    <>
      <header className="flex justify-center w-screen">
        <CustomNavBar />
      </header>
      <main className="flex flex-col items-center justify-between h-full">
        <ImgToText />
	<Separator/>
        <Footer />
      </main>
    </>
  );
}
