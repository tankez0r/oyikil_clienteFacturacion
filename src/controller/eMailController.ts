import { Request, Response } from "express"
import  jwt from "jsonwebtoken";
import { removeTemps } from "../utils/security/tempEraser";
import { CustomMailParse, mailObject } from "../utils/types/types";
import { mailProcedure } from "./mailController";

export const eMailController =
 async(req:Request, res:Response):Promise<void>=>{
    const {client_token} = req.cookies
    const decodeToken = client_token ? jwt.verify(client_token, '') : null; //process.env.POST_SECRET
if(decodeToken){
const {password, mail, idcustomer} = decodeToken as mailObject
const cred:mailObject = {mail, password};
const mails = await mailProcedure(cred) as CustomMailParse[];
res.status(200).send({idcustomer, mails})
await removeTemps(mails)

}
else{
    res.sendStatus(401)
}
  }