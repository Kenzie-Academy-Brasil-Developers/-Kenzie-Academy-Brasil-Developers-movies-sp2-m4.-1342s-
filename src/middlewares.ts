import { NextFunction, Request,Response } from "express"
import { IMovie,MovieResult } from "./intefaces"
import { client } from "./database"

const IdExistance=async(req:Request,res:Response,next:NextFunction):Promise<void|Response>=>{
    const { id }= req.params
    const queryResult:MovieResult=await client.query(
        "SELECT * FROM movies WHERE id=$1",
        [id]
    )
    const movie: IMovie=queryResult.rows[0]
    if (!movie) {
        return res.status(404).json({message:"Movie not found!"});
        }
    res.locals={...res.locals,foundMovie:movie}
    return next()
}
export default {IdExistance}