// importo el modulo mysql2/promise para poder usar promesas con mysql
import mysql from "mysql2/promise";
// importo dotenv para manejar variables de entorno
import dotenv from "dotenv"
// cargo las variables de entorno del archivo .env
dotenv.config();

// funcion asincrona para conectar a la base de datos
export default async function conectar() {
    try {
        // creo la conexion usando los datos de las variables de entorno
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER_DATABASE,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.PORT,
        });

        // si se conecta bien muestro este mensaje
        console.log("✅ Conectado a la base de datos MySQL farmacia");
        return connection;
    } catch (err) {
        // si hay error muestro el mensaje y cierro el proceso
        console.error("❌ Error al conectar a la base de datos:", err.message);
        process.exit(1);
    }
}
