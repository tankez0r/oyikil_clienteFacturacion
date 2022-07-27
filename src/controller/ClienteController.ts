import { Request, Response } from 'express';
import { cliente, correo } from '../utils/classes/models/modelClass';
import { mailObject } from '../utils/types/types';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

export const searchClientOnDB = async(req:Request, res:Response):Promise<void>=>{
  const {idcustomer, dni} = req.body;
 await cliente.findOne({where:{dni, idcustomer}, include:[correo]}).
 then(data=>{
   if(!data){
     res.sendStatus(400)
   }
else if (data){
const {mail, password, idcustomer} = data.correo
const correo:mailObject = {mail, password, idcustomer};
const secretWord = process.env.SECRET_WORD || ''
const token = sign(correo, secretWord); // agregar secret word en enviroment variable


const tokenSerialized = serialize('client_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    domain:".vercel.app",
    maxAge: 60 * 20,
    path: '/'
});


res.setHeader('Set-Cookie', tokenSerialized);
res.sendStatus(200)
}
 
}
 ).
 
 catch(error => {res.sendStatus(400); console.log(error)})

}


export const logOut = async(_req:Request, res:Response):Promise<void>=>{

const tokenSerialized = serialize('client_token', "nulltoken", {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    domain:".vercel.app",
    maxAge: -1,
    path: '/'
});

try {
  res.sendStatus(202)
  res.append('Set-Cookie', tokenSerialized);

} catch (error) {
  console.log(error)
}


}