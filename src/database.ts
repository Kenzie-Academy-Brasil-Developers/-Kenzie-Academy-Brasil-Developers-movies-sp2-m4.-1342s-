import { Client } from "pg";
import "dotenv/config";

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB,
  port: Number(process.env.DB_PORT),
});

const connectDataBase = async (): Promise<void> => {
  await client.connect();
};

export { client, connectDataBase };
