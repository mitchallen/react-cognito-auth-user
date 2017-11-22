import getAwsCredentials from './components/GetAwsCredentials';
import getCurrentUser from './components/GetCurrentUser';
import getUserToken from './components/GetUserToken';

export default async function authUser( params ) {

  // alert("authUser:\n\n" + JSON.stringify(params));

  const { awsConfig } = params;

  if (
    awsConfig.credentials &&
    Date.now() < awsConfig.credentials.expireTime - 60000
  ) {
    return true;
  }

  const currentUser = getCurrentUser(params);

  if (currentUser === null) {
    return false;
  }

  const userToken = await getUserToken(currentUser);

  await getAwsCredentials( { userToken, ...params } );

  return true;
}