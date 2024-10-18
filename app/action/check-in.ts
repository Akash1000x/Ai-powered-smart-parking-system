"use server";

import prisma from "@/database";

export async function checkIn(placeId: string, carNumber: string, mobileNumber: string) {
  try {
    await prisma.parkingRecord.update({
      where: { carNumber },
      data: { mobileNumber, placeId },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to check-in" };
  }
}
