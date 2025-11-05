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
  try {
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
  } catch (error: any) {
    console.error("[getUserData] Prisma error:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });

    // rethrow so Next.js shows a digest for this request
    throw new Error(
      `[getUserData] Failed to fetch or create user: ${error.message}`
    );
  }
}
