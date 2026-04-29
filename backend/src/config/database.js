import pg from 'pg';

console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
console.log('POSTGRES_PORT:', process.env.POSTGRES_PORT);
console.log('POSTGRES_USER:', process.env.POSTGRES_USER);

const { Pool } = pg;

const pool = new Pool({
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.ENV === 'test' ? process.env.POSTGRES_TEST_DB : process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    port: process.env.POSTGRES_PORT || 5432,
    ssl: process.env.POSTGRES_SSL === 'require' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;
