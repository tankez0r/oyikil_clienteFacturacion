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
const app_1 = __importDefault(require("./app"));
const SequelizeDB_1 = require("./DataBase/SequelizeDB");
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = process.env.PORT || 3040;
    yield SequelizeDB_1.conChain.sync();
    app_1.default.listen(PORT, () => { console.log('El servidor esta listo para pedir peticiones en el puerto: ' + PORT); });
});
startApp();
