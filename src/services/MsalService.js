import * as msal from "@azure/msal-browser"

const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    authority: import.meta.env.VITE_AUTHORITY,
  },
})


const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}

const tokenRequest = {
  scopes: JSON.parse(import.meta.env.VITE_TOKEN_REQUEST_SCOPES),  // e.g. ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"]
  forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
  account: accounts.length > 0 ? accounts[0] : null
}

const getAccessToken  = async function () {	
	return msalInstance.acquireTokenSilent(tokenRequest)
		.then((response) => {
			// In case the response from B2C server has an empty accessToken field
			// throw an error to initiate token acquisition
			if (!response.accessToken || response.accessToken === '') {
				throw new msal.InteractionRequiredAuthError
			} else {
				return response.accessToken
			}
		}).catch((error) => {
			if (error instanceof msal.InteractionRequiredAuthError) {
				// fallback to interaction when silent call fails
				console.log(tokenRequest)
				if (tokenRequest.account) {
					return msalInstance.acquireTokenRedirect(tokenRequest)
				} else {
					window.location = '/'
					return
				}
			} else {
				console.log(error)
			}
		})
}

export {
  msalInstance,
  tokenRequest,
  getAccessToken
}