import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {

    //Initialize body and statusCode variable for HTTP response state;
    let body, statusCode;

    const params = {
        TableName: process.env.NOTES_TABLE,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };


    //Try sending a http reuest to get a note from the dynamoDB table.
    try {
        await dynamoDb.delete(params).promise();
        body = { status: true };
        statusCode = 200;

    } catch (err) {
        body = { error: err.message };
        statusCode = 500;
    }

    //Return HTTP response whether success or error
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
    };


};