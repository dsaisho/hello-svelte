import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'user',
  password:'password',
  database: 'facts_db',
});

export const GET = async () => {
    const [results, fields] = await connection.query(
    'SELECT * FROM facts'
    );
    const formatted = results.map(result => {
        return {
            id: result.id,
            text: result.fact,
            
        }
    });
    return new Response(JSON.stringify(formatted));
}