import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  db_connection_string: process.env.DB_CONNECTION_STRING,
  port: process.env.PORT,
};
