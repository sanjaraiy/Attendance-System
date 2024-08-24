import { db } from "@/utils";
import { CLASSES } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(request){
    
   try {
      const result = await db.select().from(CLASSES);
   
      return NextResponse.json({result}, {status:200});
   } catch (error) {
       return NextResponse.json({error}, {status:400});
   }
  
}