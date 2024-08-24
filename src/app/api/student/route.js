import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const data = await req.json();

    const result = await db.insert(STUDENTS).values({
      name: data?.fullname,
      standard: data.standard,
      address: data?.address,
      phone: data?.phone,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(req) {
  try {
    const result = await db.select().from(STUDENTS);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
