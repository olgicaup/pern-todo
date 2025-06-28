const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.USER || 'postgres',
    password: process.env.PASSWORD || 'password',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5432,
    database: process.env.DATABASE || 'perntodo'
});

module.exports = pool;

