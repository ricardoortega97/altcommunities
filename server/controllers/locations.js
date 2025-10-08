import { pool } from "../config/database";

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
        const { location_id } = req.params;
        const result = await pool.query(
            `SELECT * FROM events WHERE location_id = $1`,
            [location_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching events by location:', err);
        res.status(500).json({ error: 'Internal server error' });

    }
};

export { getLocations, getEventsByLocation };