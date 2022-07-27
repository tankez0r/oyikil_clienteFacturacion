import { Request, Response } from "express";
import jwt from "jsonwebtoken"

export const checkIn =
 async(req:Request, res:Response):Promise<void>=>{
    const {client_token} = req.cookies
    const decodeToken = client_token ? jwt.verify(client_token, '') : null; //process.env.POST_SECRET
if(decodeToken){
res.sendStatus(200)
}
else{
    res.sendStatus(401)
}
  }