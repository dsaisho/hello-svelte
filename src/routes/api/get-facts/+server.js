import Connection from '$lib/server/dbConnection';
// Create the connection to database
const connection = await Connection()


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