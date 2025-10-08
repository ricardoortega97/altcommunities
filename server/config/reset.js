import { pool } from "./database.js";
import dotenv from "./dotenv.js"
import locationsData from "../data/locations.js";
import eventsData from "../data/events.js";

//Create table
const createCommunityTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            location VARCHAR(255)
        );

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(100) NOT NULL,
            date VARCHAR(100) NOT NULL,
            time VARCHAR(50) NOT NULL,
            type VARCHAR(100) NOT NULL,
            website VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
        );
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('Tables created!')
    } catch (err) {
        console.error('Error creating tables:', err)
    }
}
const seedCommunityData = async () => {
    try {
        await createCommunityTable();

        for (const location of locationsData) {
            try {
                const checkQuery = 'SELECT * FROM locations WHERE location = $1';
                const existingLocation = await pool.query(checkQuery, [location.location]);

                if (existingLocation.rows.length > 0) {
                    console.log(`Location ${location.location} already exists. Skipping.`);
                    continue;
                }

                const insertQuery = `
                    INSERT INTO locations (location)
                    VALUES ($1)
                `;
                await pool.query(insertQuery, [location.location]);
                console.log(`Location ${location.location} added successfully`);
            } catch (err) {
                console.error(`Error adding location ${location.location}:`, err);
            }
        }

        for (const event of eventsData) {
            try {
                let location_id = null;
                if (event.location_id) {
                    location_id = event.location_id;
                } else if (event.location) {
                    const locationQuery = 'SELECT id FROM locations WHERE location = $1';
                    const locationResult = await pool.query(locationQuery, [event.location]);
                    if (locationResult.rows.length === 0) {
                        console.error(`Location ${event.location} not found for event ${event.name}. Skipping.`);
                        continue;
                    }
                    location_id = locationResult.rows[0].id;
                } else {
                    console.error(`Location undefined not found for event ${event.name}. Skipping.`);
                    continue;
                }

                const checkQuery = 'SELECT * FROM events WHERE name = $1 AND date = $2';
                const existingEvent = await pool.query(checkQuery, [event.name, event.date]);

                if (existingEvent.rows.length > 0) {
                    console.log(`Event ${event.name} on ${event.date} already exists. Skipping.`);
                    continue;
                }

                const insertQuery = `
                    INSERT INTO events (name, location, date, time, type, website, image, location_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `;
                const values = [
                    event.name,
                    event.location,
                    event.date,
                    event.time,
                    event.type,
                    event.website,
                    event.image,
                    location_id
                ];

                await pool.query(insertQuery, values);
                console.log(`Event ${event.name} added successfully`);
            } catch (err) {
                console.error(`Error adding event ${event.name}:`, err);
            }
        }
    } catch (err) {
        console.error('Error seeding community data:', err)
    };
};
seedCommunityData();