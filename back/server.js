// index.js

// importo express para crear el servidor
import express from "express";
// importo cors para permitir peticiones de otros origenes
import cors from "cors";
// importo la funcion para conectar a la base de datos
import conectar from "./db.js";


// importo las rutas de citas
import transactionsRoutes from "./routes/transactions.js";

// importo las rutas de usuarios
import usuariosRoutes from "./routes/usuarios.js";

// importo las rutas para recibir csv desde el front
import frontCSVRoutes from "./routes/recibirCSVFront.js";

//
import querys  from "./routes/querys.js";

// creo la app de express
const app = express();
// uso cors para que no haya problemas con las peticiones
app.use(cors());
// uso express.json para poder leer json en las peticiones
app.use(express.json());

// me conecto a la base de datos y guardo la conexion en locals
const connection = await conectar();
app.locals.connection = connection;

// uso las rutas que importe antes
app.use("/transactions", transactionsRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/frontCSV", frontCSVRoutes);
app.use("/querys", querys )

// levanto el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});
