import { ParsedMail } from "mailparser";

export type CustomMailParse = Pick<ParsedMail, 'subject' | 'attachments' | 'date'>
export type mailObject = {
    mail: string;
    password: string;
    idcustomer?: string
}

export type  formRequest ={
    body: bodyForm
}
export type bodyForm = {
    customerid: string,
    dni: string
}