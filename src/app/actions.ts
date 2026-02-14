"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addLocation(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;

    await prisma.location.create({
      data: { name, location },
    });

    revalidatePath("/");

    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to add location: ", error);

    return {
      success: false,
      error: "Failed to add location. Please try again.",
    };
  }
}

export async function getLocations() {
  try {
    return await prisma.location.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch locations: ", error);
    return [];
  }
}
