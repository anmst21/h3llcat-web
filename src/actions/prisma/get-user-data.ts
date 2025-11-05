"use server";

import { prisma } from "@/lib/prisma";

type UserData = {
  id: number;
  did: string;
  email: string | null;
  isMinted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export async function getUserData(did: string): Promise<UserData> {
  let user = await prisma.userData.findUnique({
    where: { did },
  });

  // if user doesn't exist, create it
  if (!user) {
    user = await prisma.userData.create({
      data: { did },
    });
  }

  return user;
}
