import { Button, User } from "@nextui-org/react";
import LogPage from "@/components/log";

export default function UserTabs({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {

  return (
    <section className="flex flex-col lg:flex-row gap-10 pb-40 mt-14">
      <div className="flex flex-col gap-5">
        <User
          avatarProps={{
            src: `${image}`,
            isBordered: true,
            color: "primary",
          }}
          description={`${email}`}
          name={`${name}`}
        />
        <Button variant="light" isDisabled color="primary">
          Historial
        </Button>
      </div>
      <div className="border-primary border-[1px] border-solid opacity-[0.2]"></div>
      <div className="flex justify-center">
        <LogPage name={name} email={email || ""} />
      </div>
    </section>
  );
}
