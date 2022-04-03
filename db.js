require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USERNAME||"postgres",
    password: process.env.DB_PASSWORD||"password",
    database:'cart_database',
    host: process.env.DB_HOST||"localhost",
    port: process.env.DB_PORT,
})

module.exports = pool