import pool from "../config/db.js";

const queryDb = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

export default queryDb;