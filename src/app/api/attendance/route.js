import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { isNull, or } from "drizzle-orm";
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
      .leftJoin(ATTENDANCE,eq(STUDENTS.id, ATTENDANCE.studentId))
      .where(eq(STUDENTS.standard, standard))
      .where(
        or(
          eq(ATTENDANCE.date, month),
          isNull(ATTENDANCE.date),
        )
      )
    
      return NextResponse.json(result);
} catch (error) {
     return NextResponse.json(error);
}
}