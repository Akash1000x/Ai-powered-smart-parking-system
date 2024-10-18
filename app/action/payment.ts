"use server";

import prisma from "@/database";

export async function calculatePayment(carNumber: string) {
  try {
    const res = await prisma.parkingRecord.findFirst({ where: { carNumber } });

    if (!res) {
      return { success: false, error: "Car number not found" };
    }

    const entryTime = new Date(res.entryTime);
    const exitTime = new Date();

    const timeDiff = exitTime.getTime() - entryTime.getTime(); // Time difference in milliseconds
    const timeInHours = timeDiff / (1000 * 60 * 60); // Convert time to hours

    // Calculate charges
    const hourlyRate = 10;
    const minimumCharge = 20;
    let amount = Math.ceil(timeInHours) * hourlyRate;

    if (amount < minimumCharge) {
      amount = minimumCharge;
    }

    // await prisma.parkingRecord.update({
    //   where: { id: res.id },
    //   data: {
    //     exitTime,
    //     amount,
    //     paymentStatus: "PENDING", // Or update based on your flow
    //   },
    // });

    return {
      success: true,
      message: "Payment calculated successfully",
      amount,
      timeInHours: Math.ceil(timeInHours),
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
}

//TODO: Implement Payment and verify the exit time and payment time if the time is more then 15 minutes then the payment will be calculated
export async function Payment(carNumber: string, amount: number) {
  try {
    await prisma.parkingRecord.update({ where: { carNumber }, data: { paymentStatus: "PAID", amount } });
    return { success: true, message: "Payment successful" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
}
