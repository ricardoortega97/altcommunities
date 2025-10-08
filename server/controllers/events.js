import { pool } from "../config/database.js";

const getEvents = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM events`
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export default { getEvents };