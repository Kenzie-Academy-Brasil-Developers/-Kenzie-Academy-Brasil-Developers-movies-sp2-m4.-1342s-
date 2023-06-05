import { Request, Response } from "express";
import { IMovie, MovieRequest, MovieResult } from "./intefaces";
import format from "pg-format";
import { client } from "./database";
import { QueryConfig } from "pg";

const addMovie = async (req: Request, res: Response): Promise<Response> => {
  const body: MovieRequest = req.body;
  const query: string = format(
    "INSERT INTO movies(%I)VALUES(%L) RETURNING *;",
    Object.keys(body),
    Object.values(body)
  );
  const queryResult: MovieResult = await client.query(query);
  return res.status(201).json(queryResult.rows);
};

const getAllMovies = async (req: Request, res: Response): Promise<Response> => {
  const { category } = req.query;
  if (category) {
    const queryResult: MovieResult = await client.query(
      "SELECT * FROM movies WHERE category=$1;",
      [category]
    );
    return res.status(200).json(queryResult.rows);
  }
  const query: string = "SELECT * FROM movies;";
  const queryResultAll: MovieResult = await client.query(query);

  return res.status(200).json(queryResultAll.rows);
};
const getMovieById = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json(res.locals.foundMovie);
};

const editMovie = async (req: Request, res: Response): Promise<Response> => {
  const query: string = format(
    "UPDATE movies SET (%I)=ROW(%L)WHERE id=$1 RETURNING *;",
    Object.keys(req.body),
    Object.values(req.body)
  );

  const queryResult: MovieResult = await client.query(query, [req.params.id]);

  return res.status(200).json(queryResult.rows[0]);
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  await client.query("DELETE FROM movies WHERE id=$1", [req.params.id]);
  return res.status(204).json();
};

export { addMovie, getAllMovies, getMovieById, editMovie, deleteMovie };
