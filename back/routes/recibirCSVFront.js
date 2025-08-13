import express from "express";
import multer from "multer";
import fs from "fs";
import csv from "csv-parser";

// Creo el router de express
const router = express.Router();
// Configuro multer para guardar archivos en la carpeta uploads
const upload = multer({ dest: "uploads/" }); // Carpeta temporal para CSV

// Endpoint para recibir el archivo CSV
router.post("/", upload.single("archivo"), async (req, res) => {
    try {
        // Obtengo el nombre de la tabla y la ruta del archivo
        const { tabla } = req.body;
        const filePath = req.file?.path;

        // Si no hay archivo, mando error
        if (!filePath) {
            return res.status(400).json({ error: "No se ha subido ningun archivo CSV" });
        }

        // Leo el CSV y guardo los datos en un array
        const datos = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => datos.push(row))
            .on("end", async () => {
                // Recorro cada fila para validar e insertar
                for (let fila of datos) {
                    // Valido que no haya campos vacios y que los IDs sean numeros
                    for (const campo in fila) {
                        const valor = fila[campo];

                        // Si el campo es un ID, reviso que sea numero
                        if (campo.toLowerCase().includes("id") && isNaN(Number(valor))) {
                            return res.status(400).json({
                                error: `El campo ${campo} debe ser un numero valido. Valor recibido: "${valor}"`,
                            });
                        }

                        // Verifico que el campo no este vacio
                        if (valor === null || valor === undefined || valor.toString().trim() === "") {
                            return res.status(400).json({
                                error: `El campo ${campo} no puede estar vacio.`,
                            });
                        }
                    }

                    // Si pasa las validaciones, hago el insert
                    const columnas = Object.keys(fila);
                    const valores = Object.values(fila);
                    await req.app.locals.connection.query(
                        `INSERT INTO ${tabla} (${columnas.join(",")}) VALUES (${columnas
                            .map(() => "?")
                            .join(",")})`,
                        valores
                    );
                }

                // Borro el archivo temporal despues de procesar
                fs.unlinkSync(filePath);

                // Respondo que todo salio bien
                res.json({ mensaje: `CSV cargado en la tabla ${tabla}` });
            });
    } catch (error) {
        // Si hay error, lo muestro en consola y mando error al cliente
        console.error(error);
        res.status(500).json({ mensaje: "Error al subir CSV" });
    }
});

// Exporto el router para usarlo en la app principal
export default router;