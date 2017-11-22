 export default function getAwsCredentials( params ) {

    // alert("getAwsCredentials:\n\n" + JSON.stringify(params));

    const { awsConfig, userToken, userPoolId, region, identyPoolId } = params;

    const authenticator = `cognito-idp.${region}.amazonaws.com/${userPoolId}`;

    awsConfig.update({ region: region });

    awsConfig.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identyPoolId,
        Logins: {
            [authenticator]: userToken
        }
    });

    return AWS.config.credentials.getPromise();
}