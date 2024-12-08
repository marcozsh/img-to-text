import { sql } from "@vercel/postgres";
import LogCard from "./log-card";
import {getUserByNameEmail} from "@/logical/server-querys";

export async function GetLog({name, email}:{name:string, email:string}) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = await getUserByNameEmail(name, email);
  const { rows } = await sql`SELECT * FROM text_converted_log WHERE iduser = ${userId} ORDER BY id DESC`;
  console.log(rows);
  return (
    <>
      {rows.length > 0 ? (
        rows.map((item, i) => (
          <div key={`${i}`}>
            <LogCard
              text={item.text}
              date={new Date(item.text_converter_date).toLocaleString()}
	      method_used={item.method_used}
            />
          </div>
        ))
      ) : (
        <div>No hay datos para mostrar</div>
      )}
    </>
  );
}
