import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@/lib/auth";

import { UserButton } from "@/components/auth/user-button";
import { SignInButton } from "@/components/auth/signin-button";

export const Actions = async () => {
  const user = await currentUser();

  console.log({
    user,
  });

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && <SignInButton />}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-forgroung hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
