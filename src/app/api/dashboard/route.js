import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";

export async function GET(req){
    const searchParams = await req.nextUrl.searchParams;
    const date = searchParams.get('date');
    const standard = searchParams.get('standard');

    const result = await db.select({
        day:ATTENDANCE.day,
        presentCount:sql`count(${ATTENDANCE.day})`
    })
    .from(ATTENDANCE)
    .leftJoin(STUDENTS,and (eq(ATTENDANCE.studentId, STUDENTS.id), eq(ATTENDANCE.date,date)))
    .groupBy(ATTENDANCE.day)
    .where(eq(STUDENTS.standard, standard))
    .orderBy(desc(ATTENDANCE.day))
    .limit(7)
}