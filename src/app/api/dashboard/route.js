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
    .innerJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))
    .groupBy(ATTENDANCE.day)
    .where(and(eq(ATTENDANCE.date,date),eq(STUDENTS.standard, standard)))
    .orderBy(desc(ATTENDANCE.day))
    .limit(7)
}