import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { CustomMailParse, mailObject } from "../utils/types/types";
import fs from 'fs'

export const mailProcedure = async (credentials: mailObject) =>{
const {mail, password} = credentials


const mailHost= process.env.MAIL_HOST || ""
const mailPort = parseInt(process.env.MAIL_PORT || '') 


const client = new ImapFlow({
    host:mailHost,
    port: mailPort,
    secure: true,
    auth: {
        user: mail,
        pass: password
    },
    emitLogs: false,
    logger: false
});



const mails = await getMails(client) as CustomMailParse[];
if (mails.length > 14){
    await  deleteSixMonth(client)
}
else {
    client.logout();
}


const returnThisMails = mails.map((object: CustomMailParse) =>{ 
      const {attachments, ...props} = object
    const rawAttachment = attachments[0]?.content
     const newAttachmentName= "./temp/" + attachments[0]?.filename?.slice(0, -4) + "_" + attachments[0]?.cid + Date.now() + ".pdf"
 

if(rawAttachment){
    const newBuffer = Buffer.from(rawAttachment)
 fs.createWriteStream(newAttachmentName).write(newBuffer);
    return { ...props, attachments: [newAttachmentName.substring(1)]}
}
else return object
})

return returnThisMails
}






const getMails = async (client: ImapFlow): Promise<CustomMailParse[] | void[]> => {
    // Wait until client connects and authorizes
    await client.connect();
    let parsedMails: CustomMailParse[]=[];
    // Select and lock a mailbox. Throws if mailbox does not exist
    let lock = await client.getMailboxLock('INBOX');
    try {
     for await (let message of client.fetch('1:*', { envelope: true, source: true })) {
parsedMails.push({subject:(await simpleParser(message.source)).subject, attachments:(await simpleParser(message.source)).attachments, date:(await simpleParser(message.source)).date})
}
    } catch (error) {
        console.log(error)
        }
    finally {
        lock.release();

    }

    return parsedMails;

};





async function deleteSixMonth(client:ImapFlow): Promise<void>{
    let lock = await client.getMailboxLock('INBOX');
    try {
        await client.messageDelete('2:1'); 
    } catch(e){
        console.log(e)
    }
     finally {
        lock.release();
    }
    await client.logout();
}