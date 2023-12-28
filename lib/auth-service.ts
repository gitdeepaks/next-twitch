import { currentUser } from "@/lib/auth";

import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      id: self.id,
    },
  });

  if (!user) {
    throw new Error("Not Found");
  }
  return user;
};

export const getSelfByUserName = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }
  return user;
};
