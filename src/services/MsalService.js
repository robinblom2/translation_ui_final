import * as msal from '@azure/msal-browser';


const msalInstance = new msal.PublicClientApplication({
  // Passing the configuration parameters
  auth:{
    clientId: import.meta.env.VITE_CLIENT_ID,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    authority: import.meta.env.VITE_AUTHORITY,
  },
})

// create instance of PublicClientApplication to get a list of all the accounts that have been used to sign in
// to your application. 
// if there are no accounts, the user has not yet signed in.
const accounts = msalInstance.getAllAccounts();
if(accounts.length > 0){
  // if there are one or more account we set the active account by calling this.
  // setActiveAccount, a method of the PublicClientApplication to create an instance
  // to pass the account that you want to use for authentication.
  msalInstance.setActiveAccount(accounts[0]);
};

const tokenRequest = {
  scopes: JSON.parse(import.meta.env.VITE_TOKEN_REQUEST_SCOPES),
  forceRefresh: false, // set this to "true" to skip a cached token and go to the server to get a new token.
  account: accounts.length > 0 ? accounts[0] : null
}

// method to take in the scopes and option parameters that specify the permissions and options
// for the access token. 
const getAccessToken = async function () {
  console.log("token request: ", tokenRequest)
  return msalInstance.acquireTokenSilent(tokenRequest)
  // aquireTokenSilent is used to obtain an access token silently(using a cached token if available)
  //if it fails,(e.g. because there is no cached token or it has expired)
  // catch the error.
    .then((res) => {
      // In case the response from B2C server has an empty accessToken field
      // throw an error to initiate token acquisition
      if(!res.accessToken || res.accessToken === ''){
        throw new msal.InteractionRequiredAuthError
      }else{
        // return the access token if its successfully obtained. 
        return res.accessToken;
      }
    }).catch((err) => {
      if(err instanceof msal.InteractionRequiredAuthError){
        // fallback to interaction when silent call fails.
        console.log(tokenRequest);
        if(tokenRequest.account){
          return msalInstance.acquireTokenRedirect(tokenRequest)
        }else {
          window.location = '/'
          return;
        }
      }else {
        console.log(err);
      }
    })
}

export{
  msalInstance,
  tokenRequest,
  getAccessToken
}











// import * as msal from "@azure/msal-browser"


// const msalInstance = new msal.PublicClientApplication({
//   auth: {
//     clientId: import.meta.env.VITE_CLIENT_ID,
//     redirectUri: import.meta.env.VITE_REDIRECT_URI,
//     authority: import.meta.env.VITE_AUTHORITY,
//   },
// })


// const accounts = msalInstance.getAllAccounts()
// if (accounts.length > 0) {
//   msalInstance.setActiveAccount(accounts[0])
// }

// const tokenRequest = {
//   scopes: JSON.parse(import.meta.env.VITE_TOKEN_REQUEST_SCOPES),  // e.g. ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"]
//   forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
//   account: accounts.length > 0 ? accounts[0] : null
// }

// const getAccessToken  = async function () {	
// 	return msalInstance.acquireTokenSilent(tokenRequest)
// 		.then((response) => {
// 			// In case the response from B2C server has an empty accessToken field
// 			// throw an error to initiate token acquisition
// 			if (!response.accessToken || response.accessToken === '') {
// 				throw new msal.InteractionRequiredAuthError
// 			} else {
// 				return response.accessToken
// 			}
// 		}).catch((error) => {
// 			if (error instanceof msal.InteractionRequiredAuthError) {
// 				// fallback to interaction when silent call fails
// 				console.log(tokenRequest)
// 				if (tokenRequest.account) {
// 					return msalInstance.acquireTokenRedirect(tokenRequest)
// 				} else {
// 					window.location = '/'
// 					return
// 				}
// 			} else {
// 				console.log(error)
// 			}
// 		})
// }

// export {
//   msalInstance,
//   tokenRequest,
//   getAccessToken
// }