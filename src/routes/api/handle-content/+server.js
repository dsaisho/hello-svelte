import Connection from '$lib/server/dbConnection';
// Create the connection to database
const connection = await Connection()


export const POST = async ({ request, locals }) => {
  const { userContent, description } = await request.json();
  const { userId } = await locals.auth();

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  const id = generateTimestampId();
  const [insertResult] = await connection.query(
    'INSERT INTO usercontent (id, content,userid,description,date) VALUES (?,?,?,?,?)', [id, userContent, userId, description, formattedDate]
  );
  console.log('insert:', insertResult);
  return new Response(insertResult.insertId);
}

export const GET = async ({ locals, url }) => {
  const contentId = url.searchParams.get('contentid')
  if (contentId) {
    const [results] = await connection.query(
      'SELECT * FROM usercontent WHERE id = ?', [contentId]
    );
    return new Response(JSON.stringify(results));
  }

  const { userId } = await locals.auth();
  const [results] = await connection.query(
    'SELECT * FROM usercontent WHERE userid = ?', [userId]
  );

  return new Response(JSON.stringify(results));
}
function generateTimestampId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}