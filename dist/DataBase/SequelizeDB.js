"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conChain = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const modelClass_1 = require("../utils/classes/models/modelClass");
const DB_HOST = process.env.DB_HOST || 'www.cooperativaoyikil.com.ar';
const DB_NAME = process.env.DB_NAME || 'coopera3_facturacion';
const DB_USER = process.env.DB_USER || 'coopera3_facturador_admin';
const DB_PASS = process.env.DB_PASS || 'oyikilSQL22_';
exports.conChain = new sequelize_typescript_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mariadb',
    pool: {
        max: 700,
        min: 3,
        acquire: 30000,
        idle: 10000
    },
    logging: false,
    models: [modelClass_1.cliente, modelClass_1.correo],
});
