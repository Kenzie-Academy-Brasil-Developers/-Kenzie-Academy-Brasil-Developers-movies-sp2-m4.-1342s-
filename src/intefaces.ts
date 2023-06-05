import { QueryResult } from "pg";

 interface IMovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

type MovieRequest=Omit<IMovie,"id">

type MovieResult=QueryResult<IMovie>

export{IMovie, MovieRequest,MovieResult}