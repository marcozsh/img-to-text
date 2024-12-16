import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <main className={`flex flex-col items-center pt-20`}>
        <article className="flex flex-col justify-center">
          <div className="flex flex-col justify-center text-center">
            <h2 className="text-5xl mb-8">404...</h2>
	    <img loading="lazy" decoding="async" src="/not-found.gif"/>
            <h3 className="my-20 text-4xl hover:text-red-400 hover:transition-colors hover:duration-300 hover:ease-in-out">
              <Link href="/">Volver al Inicio</Link>
            </h3>
          </div>
        </article>
      </main>
    </>
  );
}
