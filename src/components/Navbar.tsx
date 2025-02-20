"use client";
import { Navbar as DefaultNavbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface INavbar {
  children: React.ReactNode;
}

export default function Navbar({ children }: INavbar) {
  return (
    <>
      <DefaultNavbar fluid rounded>
        <DefaultNavbar.Brand as={Link} href="/">
          <Image
            src={require("@/assets/images/tanyo-logo.png")}
            alt={"app-logo"}
            width={80}
            height={80}
          />
        </DefaultNavbar.Brand>
        <DefaultNavbar.Toggle />
        <DefaultNavbar.Collapse>
          <DefaultNavbar.Link href="/" active>
            Home
          </DefaultNavbar.Link>
          <DefaultNavbar.Link href="/login">Login</DefaultNavbar.Link>
        </DefaultNavbar.Collapse>
      </DefaultNavbar>
      {children}
    </>
  );
}
