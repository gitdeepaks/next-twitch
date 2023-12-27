"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const UserButton = ({ props }: any) => {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <Button onClick={handleSignOut} size="sm">
      Logout
    </Button>
  );
};
