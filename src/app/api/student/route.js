import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req, res){

   const data=await req.json();

   const result = await db.insert(STUDENTS)
   .values({
       name:data?.fullname,
       standard:data.standard,
       address:data?.address,
       phone:data?.phone
    })

    return NextResponse.json(result);
}