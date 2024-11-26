
import CustomNavBar from "@/components/custom-nav-bar";
import Link from "next/link";
import Footer from "@/components/footer";
export default function NotFound() {
  return (
    <>
      <header className="flex justify-center w-screen">
        <CustomNavBar />
      </header>
      <main className={`flex flex-col items-center pt-20`}>
        <article className="flex flex-col justify-center">
          <div className="flex flex-col justify-center text-center">
            <h2 className="text-5xl mb-8">404...</h2>
            <iframe
              src="https://giphy.com/embed/QMHoU66sBXqqLqYvGO"
              allowFullScreen
            ></iframe>
            <h3 className="my-20 text-4xl hover:text-red-400 hover:transition-colors hover:duration-300 hover:ease-in-out">
              <Link href="/">Volver al Inicio</Link>
            </h3>
          </div>
          <div className="mt-10">
            <Footer />
          </div>
        </article>
      </main>
    </>
  );
}
