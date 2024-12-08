"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import {copyToClipboard} from "@/logical/utils";
import toast from "react-hot-toast";

type LogCardType = {
  text: string;
  date: string;
  method_used: string;
};

export default function LogCard({ text, date, method_used }: LogCardType) {

  return (
    <Card className="w-[340px] h-[150px]">
      <CardHeader className="justify-start gap-4">
        <Button color="primary" radius="full" size="sm" variant={"solid"} onClick={() =>
                  copyToClipboard(text).then(() =>
                    toast.success("texto copiado"),
                  )
                }>
          Copiar
        </Button>
        <p className="text-small tracking-tight text-default-400">{date}</p>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p className="pt-4">{text}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <p className="text-small font-bold tracking-tight text-default-400">{method_used}*</p>
      </CardFooter>
    </Card>
  );
}
