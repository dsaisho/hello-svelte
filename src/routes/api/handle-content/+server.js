import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'user',
  password: 'password',
  database: 'facts_db',
});

export const POST = async ({ request, locals }) => {
  const { userContent, description } = await request.json();
  const { userId } = await locals.auth();

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  const [insertResult] = await connection.query(
    'INSERT INTO usercontent (content,userid,description,date) VALUES (?,?,?,?)', [userContent, userId, description, formattedDate]
  );
  console.log('insert:', insertResult);
  return new Response(insertResult.insertId);
}

export const GET = async ({ locals }) => {
  const { userId } = await locals.auth();
  const [results] = await connection.query(
    'SELECT * FROM usercontent WHERE userid = ?', [userId]
  );

  return new Response(JSON.stringify(results));
}