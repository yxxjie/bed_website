require('dotenv').config(); // Load environment variables

const { Pool } = require('pg'); // Import PostgreSQL client

const pool = new Pool({
    connectionString: process.env.bed_POSTGRES_URL, // Use the connection string from Neon
    ssl: {
        rejectUnauthorized: false // Required for Neon DB (TLS encryption)
    }
});

module.exports = pool;