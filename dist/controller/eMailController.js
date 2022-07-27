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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eMailController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tempEraser_1 = require("../utils/security/tempEraser");
const mailController_1 = require("./mailController");
const eMailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client_token } = req.cookies;
    const decodeToken = client_token ? jsonwebtoken_1.default.verify(client_token, 'f167f36e0a771941f0b287bbc19e4b5eb063a014d12bf9451396a65dc90d7a25') : null; //process.env.POST_SECRET
    if (decodeToken) {
        const { password, mail, idcustomer } = decodeToken;
        const cred = { mail, password };
        const mails = yield (0, mailController_1.mailProcedure)(cred);
        res.status(200).send({ idcustomer, mails });
        yield (0, tempEraser_1.removeTemps)(mails);
    }
    else {
        res.sendStatus(401);
    }
});
exports.eMailController = eMailController;
