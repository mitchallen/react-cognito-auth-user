@mitchallen/react-cognito-auth-user
==
Cognito AuthUser React method
--

<p align="left">
  <a href="https://circleci.com/gh/mitchallen/react-cognito-auth-user">
    <img src="https://img.shields.io/circleci/project/github/mitchallen/react-cognito-auth-user.svg" alt="Continuous Integration">
  </a>
  <a href="https://codecov.io/gh/mitchallen/react-cognito-auth-user">
    <img src="https://codecov.io/gh/mitchallen/react-cognito-auth-user/branch/master/graph/badge.svg" alt="Coverage Status">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/react-cognito-auth-user">
    <img src="http://img.shields.io/npm/dt/@mitchallen/react-cognito-auth-user.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/react-cognito-auth-user">
    <img src="http://img.shields.io/npm/v/@mitchallen/react-cognito-auth-user.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/@mitchallen/react-cognito-auth-user">
    <img src="https://img.shields.io/github/license/mitchallen/react-cognito-auth-user.svg" alt="License"></a>
  </a>
</p>

## Installation

    $ npm init
    $ npm install @mitchallen/react-cognito-auth-user --save
  
* * *

## Usage

Combine the code below with example code from [@mitchallen/react-cognito-login](https://www.npmjs.com/package/@mitchallen/react-cognito-login).

```
import AWS from "aws-sdk";
import authUser from "@mitchallen/react-cognito-auth-user";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      isLoadingUserToken: true,
      isLoading: false
    };
  }

  async componentDidMount() {
    try {
      if (await authUser({
        AWS: AWS, 
        userPoolId: USER_POOL_ID,
        clientId: APP_CLIENT_ID,
        region: REGION, 
        identyPoolId: IDENTITY_POOL_ID
      })) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }
  
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  
  render() {

    return (
      <div className="App">
		...
      </div>
    );
  }
}
```

## Behind the Scenes

Behind the scenes the AWS.config.credentials are updated using code similar to what is listed below.

Call authUser just before making a call to Amazon Services (for example S3) to set the proper credentials.

```
const authenticator = `cognito-idp.${region}.amazonaws.com/${userPoolId}`;

AWS.config({ region: region });

AWS.config = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identyPoolId,
    Logins: {
        [authenticator]: userToken
    }
});
```

## Example S3 Call

This example shows how to use authUser to make an S3 call.

```
import authUser from "@mitchallen/react-cognito-auth-user";

export default async function s3GetTextFile( params ) {

  let { AWS, file, bucket, ...rest } = params;

  if (!await authUser( { AWS, ...rest } )) {
    throw new Error("User is not logged in");
  }
    
  const s3 = new AWS.S3({
    params: {
      Bucket: bucket
    }
  });
          
  return s3.getObject({
    Bucket: bucket,
      Key: file
  })
  .promise()
  .then( (data) => data.Body.toString('utf-8') );
}
```

You would call the above like this:

```
const BUCKET_FILE = 'cognito/demo/demo.txt';

s3GetTextFile({ 
    AWS: AWS,
    bucket: S3_BUCKET,
    file: BUCKET_FILE, 
    userPoolId: USER_POOL_ID,
    clientId: APP_CLIENT_ID,
    region: REGION, 
    identyPoolId: IDENTITY_POOL_ID
})
.then((data) => {
    alert(data);
})
.catch(function(err) {
    alert(err);
});
```
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/react-cognito-auth-user.git](https://bitbucket.org/mitchallen/react-cognito-auth-user.git)
* [github.com/mitchallen/react-cognito-auth-user.git](https://github.com/mitchallen/react-cognito-auth-user.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.2.1

* updated documentation for change in parameters

#### Version 0.2.0

* Now requires AWS parameter
* No longer accepts awsConfig parameter

#### Version 0.1.4

* fixed AWS.config reference

#### Version 0.1.3

* cleaned up some build scripts and dependencies

#### Version 0.1.2

* added first pass at documentation

#### Version 0.1.1

* removed aws-sdk dependency
* AWS.config must now be passed in as awsConfig

#### Version 0.1.0 

* initial release

* * *