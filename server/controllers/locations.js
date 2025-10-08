import { pool } from "../config/database.js";

const getLocations = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM locations`
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching locations:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getEventsByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const result = await pool.query(
            `SELECT * FROM events WHERE location = '${location}'`
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching events by location:', err);
        res.status(500).json({ error: 'Internal server error' });

    }
};

export default { getLocations, getEventsByLocation };