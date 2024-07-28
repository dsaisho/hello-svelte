import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'user',
  password:'password',
  database: 'facts_db',
});

// A simple SELECT query

export const GET = async ({url}) => {
        const fact = url.searchParams.get('fact')

        if(!fact) return new Response('Please provide a fact', {status: 400});

        const [checkResult] = await connection.query(
            `SELECT * from Facts where fact = ?`, [fact]
        );
        if(checkResult.length > 0) return new Response('Fact already exists', {status: 409});

        const [insertResult] = await connection.query(
            'INSERT INTO Facts (fact) VALUES (?)', [fact]
        );
        console.log('Row insert Id:',insertResult.insertId); // results contains rows returned by server

     return new Response(insertResult.insertId);
}