"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export const SignIn = () => {
  const onClick = () => {
    signIn("google");
  };
  return (
    <div className="p-4 bg-muted rounded-xl">
      <Button onClick={onClick} variant="ghost">
        <FcGoogle className="h-4 w-4 mr-2" />
        Sign in with Google
      </Button>
    </div>
  );
};
