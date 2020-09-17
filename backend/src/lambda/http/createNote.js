import * as uuid from "uuid";
import { onError } from "../../libs/error-lib";

const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async(event) => {

    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    //Initialize body and statusCode variable for HTTP response state;
    let body, statusCode;

    //Define parameters for dynamoDB, It takes in target tablename and parameters to put in.
    const params = {
        TableName: process.env.NOTES_TABLE,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            createdAt: Date.now(),
            noteTitle: data.noteTitle,
            noteBody: data.noteBody
        }
    };

    //Try putting parameters into dynamodb Table.
    try {
        await dynamoDb.put(params).promise();
        body = params.Item;
        statusCode = 200;
    } catch (err) {
        body = { error: err };
        statusCode = 500;
        onError(err);
    }

    // Return HTTP response whether success or error
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
    };


};