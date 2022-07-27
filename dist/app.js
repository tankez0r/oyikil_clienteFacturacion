"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClienteController_1 = require("./controller/ClienteController");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const eMailController_1 = require("./controller/eMailController");
const cors_1 = __importDefault(require("cors"));
const corsOptions = { credentials: true, origin: ["https://martintorres-webportfolio.com.ar/", /\.martintorres-webportfolio\.com\.ar$/] };
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
app.use('/temp', express_1.default.static('./temp'));
app.post('/', ClienteController_1.searchClientOnDB);
app.post('/logout', ClienteController_1.searchClientOnDB);
app.get('/facturas', eMailController_1.eMailController); // 
app.get('/', eMailController_1.eMailController);
exports.default = app;
