"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.searchClientOnDB = void 0;
const modelClass_1 = require("../utils/classes/models/modelClass");
const cookie_1 = require("cookie");
const jsonwebtoken_1 = require("jsonwebtoken");
const searchClientOnDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idcustomer, dni } = req.body;
    yield modelClass_1.cliente.findOne({ where: { dni, idcustomer }, include: [modelClass_1.correo] }).
        then(data => {
        if (!data) {
            res.sendStatus(400);
        }
        else if (data) {
            const { mail, password, idcustomer } = data.correo;
            const correo = { mail, password, idcustomer };
            const secretWord = process.env.SECRET_WORD || 'f167f36e0a771941f0b287bbc19e4b5eb063a014d12bf9451396a65dc90d7a25';
            const token = (0, jsonwebtoken_1.sign)(correo, secretWord); // agregar secret word en enviroment variable
            const tokenSerialized = (0, cookie_1.serialize)('client_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                domain: ".vercel.app",
                maxAge: 60 * 20,
                path: '/'
            });
            res.setHeader('Set-Cookie', tokenSerialized);
            res.sendStatus(200);
        }
    }).
        catch(error => { res.sendStatus(400); console.log(error); });
});
exports.searchClientOnDB = searchClientOnDB;
const logOut = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenSerialized = (0, cookie_1.serialize)('client_token', "nulltoken", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: ".vercel.app",
        maxAge: -1,
        path: '/'
    });
    try {
        res.sendStatus(202);
        res.append('Set-Cookie', tokenSerialized);
    }
    catch (error) {
        console.log(error);
    }
});
exports.logOut = logOut;
