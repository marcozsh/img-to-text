export default function Separator({vertical}: {vertical: boolean}) {
  return (
    <hr
      className={`m-[0] border-primary border-[1px] border-solid ${vertical ? `h-full`: `w-full`} opacity-[0.2]`}
    />
  );
}

