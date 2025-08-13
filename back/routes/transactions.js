// routes/citas.js
import express from "express";
// Creo una nueva instancia de router de Express para definir las rutas de este moduloi
const router = express.Router();
//--------------------------------------------------------------------------------------------------------------

// GET todas las transactions
// aqui obtengo todas las transacctions de la base de datos
router.get("/", async (req, res) => {
    try {
        const [rows] = await req.app.locals.connection.query("SELECT * FROM transaction");
        res.json(rows);
    } catch (error) {
        // si hay error lo muestro en consola y mando error al cliente
        console.error(" Error al obtener transactions:", error.message);
        res.status(500).json({ error: "Error al obtener las transactions" });
    }
});
//--------------------------------------------------------------------------------------------------------------

// POST nueva transaction
// aqui creo una nueva transaction con los datos que me mandan en el body
router.post("/", async (req, res) => {
    try {
        const { id_customer,id_facture,date,hour,transaction_amount,id_state,id_type,id_platform } = req.body;
        await req.app.locals.connection.query(
            "INSERT INTO transaction (id_customer,id_facture,date,hour,transaction_amount,id_state,id_type,id_platform) VALUES (?,?,?,?,?,?,?,?)",
            [id_customer, id_facture,date,hour, transaction_amount, id_state, id_type, id_platform]
        );
        res.json({ mensaje: "transaction creada" });
    } catch (error) {
        // si falla la insercion muestro el error y mando respuesta de error
        console.error("❌ Error al insertar transaction:", error.message);
        res.status(500).json({ error: "Error al crear la transaction" });
    }
});
//--------------------------------------------------------------------------------------------------------------

// PUT /citas/:id → actualizar todos los campos de la transaction
// aqui actualizo todos los campos de una transaction segun el id que me mandan
router.put("/:id", async (req, res) => {
    const { id_customer, id_facture,date,hour, transaction_amount, id_state, id_type, id_platform} =
        req.body;
    const { id } = req.params;

    try {
        const [resultado] = await req.app.locals.connection.query(
            "UPDATE transaction SET id_customer = ?,id_facture = ?,date = ?,hour = ?,transaction_amount = ?,id_state = ?,id_type = ?,id_platform = ? WHERE id = ?",
            [id_customer, id_facture,date,hour, transaction_amount, id_state, id_type, id_platform, id]
        );

        // si no se encontro la transaction mando error 404
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "transaction no encontrada" });
        }

        res.json({ mensaje: "transaction actualizada correctamente" });
    } catch (err) {
        // si hay error lo muestro y mando error al cliente
        console.error(err);
        res.status(500).json({ error: "Error al actualizar transaction" + err});
    }
});

//--------------------------------------------------------------------------------------------------------------

// DELETE /citas/:id → eliminar transaction por ID
// aqui elimino una transaction segun el id que me mandan
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [resultado] = await req.app.locals.connection.query("DELETE FROM transaction WHERE id = ?", [id]);

        // si no se encontro la transaction mando error 404
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "transaction no encontrada" });
        }

        res.json({ mensaje: "transaction eliminada correctamente" });
    } catch (err) {
        // si hay error mando error al cliente
        res.status(500).json({ error: "Error al eliminar transacton" });
    }
});
//--------------------------------------------------------------------------------------------------------------

export default router;
