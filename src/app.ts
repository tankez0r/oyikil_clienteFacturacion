import express from 'express'
import { searchClientOnDB } from "./controller/ClienteController";
import cookieParser from 'cookie-parser'
import { eMailController } from './controller/eMailController';
import cors from 'cors'
const corsOptions: cors.CorsOptions = { credentials: true, origin: ["https://martintorres-webportfolio.com.ar/", /\.martintorres-webportfolio\.com\.ar$/] }
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions))
app.options('*', cors(corsOptions) as any)
app.use('/temp', express.static('./temp'))
app.post('/', searchClientOnDB)
app.post('/logout', searchClientOnDB)
app.get('/facturas',eMailController)  // 
app.get('/', eMailController)



export default app;