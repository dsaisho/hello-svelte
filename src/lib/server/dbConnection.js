import mysql from 'mysql2/promise';

export default async () => {

    return await mysql.createPool({
        user: "mistersa",
        password: "Fuckyou1.",
        host: "50.87.150.19",
        database: "mistersa_hello_svelte",
    });
}