import React from "react";
import layout from "../layout";
import { Logo } from "./_components/logo";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

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

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-6">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
