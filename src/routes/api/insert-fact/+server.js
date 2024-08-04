import Connection from '$lib/server/dbConnection';
// Create the connection to database
const connection = await Connection()

// A simple SELECT query

export const GET = async ({url}) => {
        const fact = url.searchParams.get('fact')

        if(!fact) return new Response('Please provide a fact', {status: 400});

        const [checkResult] = await connection.query(
            `SELECT * from facts where fact = ?`, [fact]
        );
        if(checkResult.length > 0) return new Response('Fact already exists', {status: 409});

        const [insertResult] = await connection.query(
            'INSERT INTO facts (fact) VALUES (?)', [fact]
        );
        console.log('Row insert Id:',insertResult.insertId); // results contains rows returned by server

     return new Response(insertResult.insertId);
}