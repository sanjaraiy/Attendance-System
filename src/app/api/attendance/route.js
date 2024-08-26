import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){

try {
      const searchParams = await req.nextUrl.searchParams;
      const standard = searchParams.get('standard');
      const month = searchParams.get('month');
      console.log({standard, month});
      
      const result = await db.select({
        name:STUDENTS.name,
        present:ATTENDANCE.present,
        day:ATTENDANCE.day,
        date:ATTENDANCE.date,
        standard:STUDENTS.student,
        studentId:STUDENTS.id,
        attendanceId:ATTENDANCE.id
      })
      .from(STUDENTS)
      .leftJoin(ATTENDANCE,and (eq(STUDENTS.id, ATTENDANCE.studentId), eq(ATTENDANCE.date, month)))
      .where(eq(STUDENTS.standard, standard))
     
    
      return NextResponse.json(result);
} catch (error) {
     return NextResponse.json(error);
}
}

export async function POST(req, res){
  try {
      const data = await req.json();
      const result = await db.insert(ATTENDANCE)
      .values({
        studentId:data.studentId,
        present:data.present,
        day:data.day,
        date:data.date,
      })
  
      return NextResponse.json(result);
  } catch (error) {
      return NextResponse.json(error);
  }

}

export async function DELETE(req){

 try {
   const searchParams = await req.nextUrl.searchParams;
   const studentId = searchParams.get('stduentId');
   const date = searchParams.get('date');
   const day = searchParams.get('day');
 
   const result = await db.delete(ATTENDANCE)
   .where(
    and(
      eq(ATTENDANCE.studentId, studentId),
      eq(ATTENDANCE.day, day),
      eq(ATTENDANCE.date, date),
    )
   )
  
 
   return NextResponse.json(result);
 } catch (error) {
     return NextResponse.json(error);
 }
}