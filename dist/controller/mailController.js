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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailProcedure = void 0;
const imapflow_1 = require("imapflow");
const mailparser_1 = require("mailparser");
const fs_1 = __importDefault(require("fs"));
const mailProcedure = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail, password } = credentials;
    const mailHost = process.env.MAIL_HOST || 'www3.baehost.com';
    const mailPort = parseInt(process.env.MAIL_PORT || '') || 993;
    const client = new imapflow_1.ImapFlow({
        host: mailHost,
        port: mailPort,
        secure: true,
        auth: {
            user: mail,
            pass: password
        },
        emitLogs: false,
        logger: false
    });
    const mails = yield getMails(client);
    if (mails.length > 14) {
        yield deleteSixMonth(client);
    }
    else {
        client.logout();
    }
    const returnThisMails = mails.map((object) => {
        var _a, _b, _c, _d;
        const { attachments } = object, props = __rest(object, ["attachments"]);
        const rawAttachment = (_a = attachments[0]) === null || _a === void 0 ? void 0 : _a.content;
        const newAttachmentName = "./temp/" + ((_c = (_b = attachments[0]) === null || _b === void 0 ? void 0 : _b.filename) === null || _c === void 0 ? void 0 : _c.slice(0, -4)) + "_" + ((_d = attachments[0]) === null || _d === void 0 ? void 0 : _d.cid) + Date.now() + ".pdf";
        if (rawAttachment) {
            const newBuffer = Buffer.from(rawAttachment);
            fs_1.default.createWriteStream(newAttachmentName).write(newBuffer);
            return Object.assign(Object.assign({}, props), { attachments: [newAttachmentName.substring(1)] });
        }
        else
            return object;
    });
    return returnThisMails;
});
exports.mailProcedure = mailProcedure;
const getMails = (client) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    // Wait until client connects and authorizes
    yield client.connect();
    let parsedMails = [];
    // Select and lock a mailbox. Throws if mailbox does not exist
    let lock = yield client.getMailboxLock('INBOX');
    try {
        try {
            for (var _b = __asyncValues(client.fetch('1:*', { envelope: true, source: true })), _c; _c = yield _b.next(), !_c.done;) {
                let message = _c.value;
                parsedMails.push({ subject: (yield (0, mailparser_1.simpleParser)(message.source)).subject, attachments: (yield (0, mailparser_1.simpleParser)(message.source)).attachments, date: (yield (0, mailparser_1.simpleParser)(message.source)).date });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        lock.release();
    }
    return parsedMails;
});
function deleteSixMonth(client) {
    return __awaiter(this, void 0, void 0, function* () {
        let lock = yield client.getMailboxLock('INBOX');
        try {
            yield client.messageDelete('2:1');
        }
        catch (e) {
            console.log(e);
        }
        finally {
            lock.release();
        }
        yield client.logout();
    });
}
