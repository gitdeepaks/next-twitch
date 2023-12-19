import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];
  if (userId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          id: userId,
        },
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return users;
};
