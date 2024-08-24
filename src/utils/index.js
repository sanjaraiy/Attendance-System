import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST_NAME,
      user: process.env.DB_USER_NAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10, // Adjust this as needed
      queueLimit: 0,
    });
  }

  return pool;
};

// Initialize drizzle with the pool
export const db = drizzle(await getConnection());



// const connection = await mysql.createPool({
//   host: process.env.DB_HOST_NAME,
//   user: process.env.DB_USER_NAME,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10, // Adjust this as needed
//   queueLimit: 0
// });
