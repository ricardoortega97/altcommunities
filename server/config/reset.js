import { pool } from "./database";
import dotenv from "./dotenv.js"

//Create table
const createCommunityTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXIST community (
            id SERIAL PRIMARY KEY,
            name VARCHAR(225) NOT NULL,
            location VARCHAR (225) NOT NULL,
            type VARCHAR (225) NOT NULL,
            date VARCHAR (225) NOT NULL,
            website VARCHAR (225) NOT NULL,
            image VARCHAR (225) NOT NULL,
            time VaRCHAR (225) DEFAULT CURRENT_TIMESTAMP
    )`;

    try {
        const res = await pool.query(createCommunityTable);
        console.log('Table created !')
    } catch (err) {
        console.error('Error creating table:', err)
    }
}
const seedCommunityData = async () => {
    try {
        await createCommunityTable();

        for (const community of communityData) {
            try {
                const checkQuery = 'SELECT * FROM community WHERE name = $1';
                const existingCommuity = await pool.query(checkQuery, [community.name])

                if (existingCommuity.rows.length > 0) {
                    console.log(`Community with name ${community.name} already exist. skipping`)
                    continue;
                }

                const insertQuery = `
                    INSERT INTO community (name, location, type, date, website, image, time)
                        VALUE ($1, $2, $3, $4, $5, $6, $7)
                        )`;
                const values = [
                    community.name,
                    community.location,
                    community.type,
                    community.date,
                    community.website,
                    community.image,
                    community.time
                ];

                await pool.query(insertQuery, values);
                console.log(`Community with name ${community.name} added successfully`)
            } catch (err) {
                console.error(`Error adding community with name ${community.name}:`, err)
            }
        }
    } catch (err) {
        console.error('Error seeding community data:', err)
    };
};
seedCommunityData();