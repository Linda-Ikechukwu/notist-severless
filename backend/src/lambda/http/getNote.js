const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {

    //Initialize body and statusCode variable for HTTP response state;
    let body, statusCode, result;

    //Define parameters for dynamoDB, It takes in target tablename and userID index to get notes from and a noteId
    const params = {
        TableName: process.env.NOTES_TABLE,

        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter from api endpoint in serverless.yml
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };


    //Try sending a http reuest to get a note from the dynamoDB table.
    try {
        result = await dynamoDb.get(params).promise();
        body = result.Item;
        statusCode = 200;

    } catch (err) {

        if ( !result.Item) {
            throw new Error("Item not found.");
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