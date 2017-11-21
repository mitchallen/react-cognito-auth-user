
export default function getUserToken(currentUser) {
    
      if(!currentUser) {
        throw new Error("getUserToken currentUser not defined");
      }
    
      return new Promise((resolve, reject) => {
        currentUser.getSession(function(err, session) {
          if (err) {
            reject(err);
            return;
          }
          resolve(session.getIdToken().getJwtToken());
        });
      });
    }
      