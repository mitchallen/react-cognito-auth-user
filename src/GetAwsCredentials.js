import AWS from "aws-sdk";

// export default function getAwsCredentials({ userToken, userPoolId, region, identyPoolId } ) { 
export default function getAwsCredentials( params ) {

    // alert("getAwsCredentials:\n\n" + JSON.stringify(params));

    const { userToken, userPoolId, region, identyPoolId } = params;

    const authenticator = `cognito-idp.${region}.amazonaws.com/${userPoolId}`;

    AWS.config.update({ region: region });

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identyPoolId,
        Logins: {
            [authenticator]: userToken
        }
    });

    return AWS.config.credentials.getPromise();
}