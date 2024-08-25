import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const CLASSES=mysqlTable('classes',{
    id:int('id',{length:11}).primaryKey(),
    standard:varchar('standard', {length:10}).notNull()
});

export const STUDENTS = mysqlTable('students', {
    id:int('id',{length:11}).autoincrement().primaryKey(),
    name:varchar('fullname',{length:20}).notNull(),
    standard:varchar('standard', {length:10}).notNull(),
    address:varchar('address', {length:50}).notNull(),
    phone:varchar('phone',{length:10}).notNull(),
})

export const ATTENDANCE = mysqlTable('attendance', {
    id:int('id',{length:11}).autoincrement().primaryKey(),
    studentId:int('studentId',{length:11}).notNull(),
    present:boolean('present').default(false),
    day:int('day',{length:11}).notNull(), //22
    date:varchar('date', {length:20}).notNull() //05/2024
})