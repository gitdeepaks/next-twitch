"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Failed to follow something went wrong!"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Failed to follow something went wrong!"));
    });
  };

  const onCLick = isFollowing ? handleUnFollow : handleFollow;

  return (
    <Button disabled={isPending} onClick={onCLick} variant="primary">
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
