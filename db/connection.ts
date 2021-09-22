import { Pool } from 'pg';

// export const client = new Client({
//     host: "localhost",
//     user: "Leonardy",
//     port: 5432,
//     password: "1234",
//     database: "restaurant"
// })

export const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "restaurant"
})