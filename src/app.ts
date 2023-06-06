import "dotenv/config";
import express, { Application, json } from "express";
import { client, connectDataBase } from "./database";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  editMovie,
  deleteMovie,
} from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/movies", addMovie);
app.use("/movies/:id", middlewares.IdExistance);
app.get("/movies", getAllMovies);
app.get("/movies/:id", getMovieById);
app.patch("/movies/:id", editMovie);
app.delete("/movies/:id", deleteMovie);

const onlineMsg: string = "server online";

app.listen(process.env.PORT, async () => {
  await connectDataBase();
  console.log(onlineMsg);
});
