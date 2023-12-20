"use client";

import { toast } from "sonner";

import { updateStream } from "@/actions/stream";

import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

export const ToggleCard = ({
  field,
  label,
  value = false,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChage = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => {
          toast.success(`chat settings updated`);
        })
        .catch(() => {
          toast.error(`something went wrong`);
        });
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            onCheckedChange={onChage}
            checked={value}
          >
            {value ? "on" : "off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
