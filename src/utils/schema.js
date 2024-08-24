import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const CLASSES=mysqlTable('classes',{
    id:int('id').primaryKey(),
    standard:varchar('standard', {length:10}).notNull()
});

export const STUDENTS = mysqlTable('students', {
    id:int('id').autoincrement().primaryKey(),
    name:varchar('fullname',{length:20}).notNull(),
    standard:varchar('standard', {length:10}).notNull(),
    address:varchar('address', {length:50}).notNull(),
    phone:varchar('phone',{length:10}).notNull(),
})