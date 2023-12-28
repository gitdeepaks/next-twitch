import { getSelfByUserName } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import React from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/public/spooky.svg",
      href: "/public/spooky.svg",
    },
  ],
};

async function CreatorLayout({ children, params }: CreatorLayoutProps) {
  const self = await getSelfByUserName(params.username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}

export default CreatorLayout;
