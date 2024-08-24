export default {
  schema: "./schema.ts",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USER_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};
