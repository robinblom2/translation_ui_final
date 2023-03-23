import { defineStore } from 'pinia';
import { msalInstance, getAccessToken } from '../services/MsalService';

export const useUserSessionStore = defineStore('userSession', {
  state: () => {
    return {
      // variable which is initially set to null, to keep track of the currently active account.
      activeAccount: null,
      isLoggedIn: false,
    }
  },

  actions: {
    init() {
      // Set the active account by calling the getActiveAccounts from 'MsalService' instance. 
      const accounts = msalInstance.getAllAccounts()
      if (accounts.length > 0) {
        this.setActiveAccount(accounts[0])
        this.setloggedIn(true);
      }

      msalInstance.addEventCallback((event) => {
        // set active account after redirect
        // Check if the event that triggered the callback is a successful login event.
        // and check if an account object is included in the event payload
        // the payload will contain information about the authenticated user account. 
        // such as account object, access token, and ID token.
        if (event.eventType === 'msal:loginSuccess' && event.payload.account) {
          this.setActiveAccount(event.payload.account)
          this.setloggedIn(true);
        }
      }, (err) => {
        console.log('error', err);
      })

      // Get the active account and set it using setActiveAccount(). Also gets the access token
      // and sets it in my state.
      msalInstance.handleRedirectPromise()
        .then(() => {
          const account = msalInstance.getActiveAccount()
          if (account) {
            this.setActiveAccount(account)
            this.setloggedIn(true)
            getAccessToken()
          }
        })
    },

    // Initiate the login flow.
    logIn() {
      msalInstance.loginRedirect()
      console.log(this.isLoggedIn)
    },

    // logOut the user, and set the activeAccount variable to null.
    logOut() {
      this.activeAccount = null
      this.setloggedIn(false);
      msalInstance.logoutRedirect()
    },

    // Action to set the activeAccount state variable to the account that is passed in as a parameter. 
    setActiveAccount(account) {
      msalInstance.setActiveAccount(account)
      this.activeAccount = account;
    },

    setloggedIn(isLoggedIn){
      this.isLoggedIn = isLoggedIn;
    }
  },
})