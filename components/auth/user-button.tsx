import { signOut } from "@/next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserAvatar } from "../user-avatar";
import { getSelf } from "@/lib/auth-service";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { SettingsModal } from "./settings-modal";

export const UserButton = async ({ props }: any) => {
  const user = await getSelf();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar username={user.username!} imageUrl={user.image!} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <SettingsModal
          initiatlImage={user.image}
          initiatalUsername={user.username}
        />
        <DropdownMenuSeparator />
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <Button size="sm" variant="ghost" className="w-full justify-start">
            <LogOut className="h-5 w-4 mr-2" />
            LogOut
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
