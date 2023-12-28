"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (value: Partial<User>) => {
  try {
    const self = await getSelf();

    const validData = {
      bio: value.bio,
      username: value.username,
      image: value.image,
    };

    if (validData.username === "" || validData.username === null) {
      throw new Error("Username cannot be empty");
    }

    const user = await db.user.update({
      where: { id: self.id },
      data: { ...validData },
    });
    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return user;
  } catch (error) {
    throw new Error("Intarnal Error");
  }
};
