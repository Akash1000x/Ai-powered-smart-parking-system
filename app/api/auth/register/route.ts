import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/database";

export const POST = async (req: Request) => {
  try {
    const { name, email, phoneNumber: mobile, password, placeName } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log({ name, email, mobile, password, placeName, hashedPassword });

    await prisma.admin.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
        placeName,
      },
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    if ((error as { code?: string }).code === "P2002") {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
