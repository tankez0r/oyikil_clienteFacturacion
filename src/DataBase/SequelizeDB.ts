import { Sequelize } from 'sequelize-typescript';
import { cliente, correo } from '../utils/classes/models/modelClass';

const DB_HOST = process.env.DB_HOST || 	'www.cooperativaoyikil.com.ar'; 
const DB_NAME = process.env.DB_NAME || 'coopera3_facturacion';
const DB_USER = process.env.DB_USER ||  'coopera3_facturador_admin';
const DB_PASS = process.env.DB_PASS || 'oyikilSQL22_';

export const conChain = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: 'mariadb',
        pool: {
            max: 700,
            min: 3,
            acquire: 30000,
            idle: 10000
        },
        logging: false,
        models:[cliente, correo],
    },
);