"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import ThemeToggle from "./theme-toggle";
import Image from "next/image";
import { signOut } from "next-auth/react";

type CustomNavBarType = {
  name?: string | null;

};

export default function CustomNavBar({ name }: CustomNavBarType) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


  const customSignout = () => {
    signOut({ callbackUrl: `/signin` });
  };
  const v = () => {};
  let sesionItems = name
    ? [
        {
          name: name,
          href: `/${name}`,
          customFn: v,
        },
        {
          name: "Salir",
          href: null,
          customFn: customSignout,
        },
      ]
    : [{ name: "Iniciar Sesión", href: "signin", customFn: v }];

  let menuItems = [
    { name: "Inicio", href: "/home" },
    { name: "¿Cómo funciona?", href: "how-it-works" },
  ];

  return (
    <Navbar
      className="bg-background"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-primary"
        />
        <NavbarBrand>
          <Link href="/home">
            <Image src="/icon.png" width={40} height={40} alt="icon image" />
            <h1 className=" pl-4 md:text-1xl lg:text-2xl font-bold text-inherit dark:text-white md:pl-5 dark:hover:text-primary dark:hover:transition-colors dark:hover:duration-300 dark:hover:ease-in-out">
              Convertir Imagen a Texto
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/home">
            <span className="text-primary dark:text-white dark:hover:text-primary dark:hover:transition-colors dark:hover:duration-300 dark:hover:ease-in-out ">
              Inicio
            </span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="how-it-works/" aria-current="page">
            <span className="text-primary dark:text-white dark:hover:text-primary dark:hover:transition-colors dark:hover:duration-300 dark:hover:ease-in-out ">
              ¿Cómo funciona?
            </span>
          </Link>
        </NavbarItem>
        {name ? (
          <>
            <NavbarItem isActive>
	    <Link href={`/${name}`}>
              <span className="text-primary dark:text-white dark:hover:text-primary dark:hover:transition-colors dark:hover:duration-300 dark:hover:ease-in-out">
                {name}
              </span>
	    </Link>
              <Button
                className="bg-background"
                onPress={() => {
                  localStorage.removeItem("session");
                  signOut({ callbackUrl: `/signin` });
                }}
              >
                <span className="text-primary dark:text-white dark:hover:text-primary dark:hover:transition-colors dark:hover:duration-300 dark:hover:ease-in-out ">
                  Salir
                </span>
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="signin/" aria-current="page">
                <span className="text-primary dark:text-white dark:hover:text-primary dark:hover:transition-colors dark:hover:duration-300 dark:hover:ease-in-out ">
                  Iniciar Sesión
                </span>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, i) => (
          <NavbarMenuItem key={`${i}`}>
            <Button
              className="w-full text-white bg-primary"
              href={`${item.href}`}
              size="lg"
              as={Link}
            >
              {item.name}
            </Button>
          </NavbarMenuItem>
        ))}
        {sesionItems.map((item, i) => (
          <NavbarMenuItem key={`${i}`}>
            <Button
              className="w-full text-white bg-primary"
              href={item.href ? `${item.href}` : "#"}
              size="lg"
              onPress={item.customFn}
              as={item.href ? Link : Button}
            >
              {item.name}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarItem>
        <span className="text-primary dark:text-white dark:hover:text-primary dark:hover:transition-colors dark:hover:duration-300 dark:hover:ease-in-out cursor-pointer">
          <ThemeToggle />
        </span>
      </NavbarItem>
    </Navbar>
  );
}
