"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { Import, MinusCircle } from "lucide-react";

import { Hint } from "../hint";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "../ui/button";
import { hostname } from "os";

interface CommunityItemProps {
  hostname: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostname,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const color = stringToColor(participantName || "");
  const isSelf = participantIdentity === viewerName;
  const isHost = viewerName === hostname;
  const [isPending, startTransition] = useTransition();

  const handleblock = async () => {
    if (!participantName || isSelf || !isHost) {
      return;
    }
    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(`Blocked ${participantName}`);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleblock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
