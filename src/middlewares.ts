import { NextFunction, Request, Response } from "express";
import { IMovie, MovieResult } from "./intefaces";
import { client } from "./database";
import format from "pg-format";

const IdExistance = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { id } = req.params;
  const queryResult: MovieResult = await client.query(
    "SELECT * FROM movies WHERE id=$1",
    [id]
  );
  const movie: IMovie = queryResult.rows[0];
  if (!movie) {
    return res.status(404).json({ error: "Movie not found!" });
  }
  res.locals = { ...res.locals, foundMovie: movie };
  return next();
};

const nameExistance = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  let movieName: string = "";
  if (req.method === "POST") {
    movieName = req.body.name;
  }
  if (req.body.name) {
    movieName = req.body.name;
  }

  const queryString: string = `SELECT * FROM movies WHERE name=$1`;
  const QueryConfig = {
    text: queryString,
    values: [req.body.name],
  };
  const queryResult: MovieResult = await client.query(QueryConfig);
  if (queryResult.rowCount > 0) {
    return res.status(409).json({ error: "Movie name already exists!" });
  }
  next();
};

export default { IdExistance, nameExistance };
