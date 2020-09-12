import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {

    //Initialize body and statusCode variable for HTTP response state;
    let body, statusCode;

    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.NOTES_TABLE,
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET noteTitle = :noteTitle, noteBody = :noteBody",
        ExpressionAttributeValues: {
            ":noteTitle": data.noteTitle || null,
            ":noteBody": data.noteBody || null
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW"
    };


    //Try sending a http reuest to get a note from the dynamoDB table.
    try {
        await dynamoDb.update(params).promise();
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