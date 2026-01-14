import mysql from 'mysql2';
import myLogs from '../src/utils/myLogs';

const db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

const pool = mysql.createPool(db_config);

pool.getConnection((err, conn) => {
    if (err) return myLogs("❌", `Error connecting to db: ${err.message}`);

    myLogs("📶", "Connected to db");
    conn.release();
});

export default pool;