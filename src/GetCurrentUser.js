import { CognitoUserPool } from 'amazon-cognito-identity-js';

// export default function getCurrentUser(config) {
export default function getCurrentUser({ userPoolId, clientId }) {

    const userPool = new CognitoUserPool({
        UserPoolId: userPoolId,
        ClientId: clientId
    });
    return userPool.getCurrentUser();
}