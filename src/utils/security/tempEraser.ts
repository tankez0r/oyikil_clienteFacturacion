import { CustomMailParse } from "../types/types";
import fs from 'fs'

export async function removeTemps (mails:CustomMailParse[]):Promise<void> {

    mails.forEach((mail:CustomMailParse) => {
mail.attachments.forEach((attachment: any) => {
    setTimeout(() => {
        fs.unlink(  "."+attachment,()=>{console.log(attachment + " eliminado")} )
    }, 30000);
});
    });
}



