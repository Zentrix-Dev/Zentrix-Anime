// lib/actions/user.ts
"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveWatchProgress(animeId: number, episode: number, timestamp: number) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    await db.continueWatching.upsert({
      where: {
        userId_animeId: {
          userId: session.user.id,
          animeId: animeId,
        }
      },
      update: {
        episode,
        timestamp,
      },
      create: {
        userId: session.user.id,
        animeId,
        episode,
        timestamp,
      }
    });

    // Revalidate the profile page so the user sees updated history
    revalidatePath("/profile");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save progress:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
