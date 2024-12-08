import { GetLog } from "@/components/get-logs";
import { CircularProgress } from "@nextui-org/react";
import { Suspense } from "react";

export default function LogPage({name, email} : {name:string, email:string}) {
  return (
    <>
      <section className="flex flex-col gap-1 pb-2 text-center w-[70%] lg:text-start lg:w-[700px]">
        <h2 className="text-4xl sm:text-5xl sm:leading-[64px] mt-4 mb-0 break-words">
          Historial de conversiones a texto
        </h2>
        <div className="flex justify-center lg:justify-start flex-row gap-5 flex-wrap">
          <Suspense fallback={<CircularProgress label="Cargando" color="danger" />}>
            <GetLog name={name} email={email} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
