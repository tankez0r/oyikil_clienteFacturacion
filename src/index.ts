import app from "./app";
import { conChain } from "./DataBase/SequelizeDB";


const startApp = async(): Promise<void> => {
    const PORT = process.env.PORT || 3040;
    await conChain.sync();
    app.listen(PORT, () => { console.log('El servidor esta listo para pedir peticiones en el puerto: ' + PORT); });

};
startApp();