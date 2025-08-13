import express from "express";
const router = express.Router();
//--------------------------------------------------------------------------------------------------------------

// GET todos los usuarios
router.get("/", async (req, res) => {
    try {
        const [rows] = await req.app.locals.connection.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        console.error("❌ Error al obtener pacientes:", error.message);
        res.status(500).json({ error: "Error al obtener los pacientes" });
    }
});

export default router;