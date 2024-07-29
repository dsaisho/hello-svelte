import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'user',
  password:'password',
  database: 'facts_db',
});

export const DELETE = async ({url}) => {
    const id = url.searchParams.get('id')
    const [results, fields] = await connection.query(
    'DELETE FROM facts where id = ?',[id]
    );

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
//    return new Response(results,{headers: { 'Content-Type': 'application/json' }});
    //return new Response('hi')
    return new Response(JSON.stringify(results));
}