import { Client } from "pg";
import "dotenv/config";

console.log(process.env.DB_USER);

const client= new Client
    ({
        user: "3490",
        password: "1256",
        host: "localhost",
        database:"movies",
        port:5432,
      });

const connectDataBase= async():Promise<void>=>{
    await client.connect()
}

export {client, connectDataBase}