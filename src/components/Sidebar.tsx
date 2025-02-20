"use client";
import { Sidebar as DefaultSidebar } from "flowbite-react";
import { HiChartPie, HiLogout } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

interface ISidebar {
  children: React.ReactNode;
}

export default function Sidebar({ children }: ISidebar) {
  return (
    <div className="flex flex-1 flex-row min-h-svh">
      <DefaultSidebar>
        <Link href={"/dashboard"}>
          <Image
            src={require("@/assets/images/tanyo-logo.png")}
            alt={"app-logo"}
            width={80}
            height={80}
            className="mb-4"
          />
        </Link>
        <DefaultSidebar.Items className="w-72 min-h-svh">
          <DefaultSidebar.ItemGroup>
            <DefaultSidebar.Item href="/dashboard" icon={HiChartPie}>
              Dashboard
            </DefaultSidebar.Item>
            <DefaultSidebar.Item href="/login" icon={HiLogout}>
              Logout
            </DefaultSidebar.Item>
          </DefaultSidebar.ItemGroup>
        </DefaultSidebar.Items>
      </DefaultSidebar>
      {children}
    </div>
  );
}
