import { auth } from "@/next-auth";

export const useAuth = () => {
  return null;
};

export const useUser = () => {
  return null;
};

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
