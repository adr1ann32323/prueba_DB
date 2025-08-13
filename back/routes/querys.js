import express from "express";
// Creo una nueva instancia de router de Express para definir las rutas de este módulo
const router = express.Router();
//--------------------------------------------------------------------------------------------------------------

// GET todas las transactions
// aqui obtengo todas las transacctions de la base de datos
router.get("/1", async (req, res) => {
    try {
        const [rows] = await req.app.locals.connection.query(`SELECT 
                c.id AS id_cliente,
                c.name,
                SUM(t.transaction_amount) AS total_pagado
            FROM customer c
            JOIN transaction t ON c.id = t.id_customer
            GROUP BY c.id, c.name`);
        res.json(rows);
    } catch (error) {
        // si hay error lo muestro en consola y mando error al cliente
        res.status(500).json({ error: "Error obteniendo total pagado por cliente" });
    }
});


router.get("/2", async (req, res) => {
    try {
        const [rows] = await req.app.locals.connection.query(`
            SELECT 
                f.id AS id_factura,
                f.periodo,
                f.amount,
                f.amount_paid,
                c.name AS cliente,
                t.id AS id_transaccion,
                t.transaction_amount,
                t.date,
                t.hour
            FROM facture f
            JOIN customer c ON c.id = (
                SELECT id_customer 
                FROM transaction 
                WHERE id_facture = f.id 
                LIMIT 1
            )
            LEFT JOIN transaction t ON t.id_facture = f.id
            WHERE f.amount_paid < f.amount OR f.amount_paid IS NULL
        `);
        res.json(rows);
    } catch (error) {
        // si hay error lo muestro en consola y mando error al cliente
        res.status(500).json({ error: "Error obteniendo total pagado por cliente" });
    }
});




router.get("/3", async (req, res) => {
    const { nombre } = req.params;
    try {
        const [rows] = await req.app.locals.connection.query(`
            SELECT 
                t.id AS id_transaccion,
                p.platform AS plataforma,
                c.name AS cliente,
                f.id AS id_factura,
                t.transaction_amount,
                t.date,
                t.hour
            FROM transaction t
            JOIN platform p ON t.id_platform = p.id
            JOIN customer c ON t.id_customer = c.id
            JOIN facture f ON t.id_facture = f.id
            WHERE p.platform = "nequi"
        `, [nombre]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo transacciones por plataforma" });
    }
});

export default router;