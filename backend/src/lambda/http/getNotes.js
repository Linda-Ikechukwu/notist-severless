import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {

    //Initialize body and statusCode variable for HTTP response state;
    let body, statusCode, result;

    //Define parameters for dynamoDB, It takes in target tablename and userId to get all notes from .
    const params = {
        TableName: process.env.NOTES_TABLE,

        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };


    //Try sending a http reuest to get a note from the dynamoDB table.
    try {
        result = await dynamoDb.guery(params).promise();
        body = result.Items;
        statusCode = 200;
    }catch (err) {
        if (!result.Items) {
            throw new Error("No entry for this user");
        }
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