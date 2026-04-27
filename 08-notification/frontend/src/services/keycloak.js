import Keycloak from 'keycloak-js';

const options = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  realm: import.meta.env.VITE_KEYCLOAK_REALM
}
const keycloak = new Keycloak(options);
let authenticated;
let store = null;


/**
 * Initializes Keycloak, then run callback. This will prompt you to login.
 *
 * @param onAuthenticatedCallback
 */
async function init(onInitCallback) {
  try {
    // Check if current route is public in our router
    // This is a bit hacky because router might not be initialized yet,
    // but we can check the hash against known public routes.
    const publicRoutes = ['/logout-redirect', '/auth-callback'];
    const isPublic = publicRoutes.some(route => window.location.hash.startsWith('#' + route));

    // If we are on a public page, we don't want to force login immediately.
    if (isPublic) {
      // For these pages we use check-sso
      authenticated = await keycloak.init({ 
        onLoad: "check-sso", 
        checkLoginIframe: false
      });
    } else {
      authenticated = await keycloak.init({ 
        onLoad: "login-required",
        checkLoginIframe: false,
        redirectUri: window.location.origin + '/#/auth-callback'
      });
    }
    
    onInitCallback();
  } catch (error) {
    console.error("Keycloak init failed")
    console.error(error)
    // Even if init fails, we might want to render the app for public pages
    onInitCallback();
  }
};

/**
 * Initializes store with Keycloak user data
 *
 */
async function initStore(storeInstance) {
  try {
    store = storeInstance
    
    if (authenticated) {
      store.initOauth(keycloak)
    }

    // Check if current route is public
    const publicRoutes = ['/logout-redirect', '/auth-callback'];
    const isPublicPage = publicRoutes.some(route => window.location.hash.startsWith('#' + route));

    if (!authenticated && !isPublicPage) { 
      console.warn("User is not authenticated and not on a public page");
    }
  } catch (error) {
    console.error("Keycloak store init failed")
    console.error(error)
  }
};

/**
 * Logout user
 */
function logout(url) {
  keycloak.logout({ redirectUri: url });
}

/**
 * Refreshes token
 */
async function refreshToken() {
  try {
    await keycloak.updateToken(300); // 300 secs | 5 mins
    return keycloak;
  } catch (error) {
    console.error('Failed to refresh token');
    console.error(error);
  }
}

const KeycloakService = {
  CallInit: init,
  CallInitStore: initStore,
  CallLogout: logout,
  CallTokenRefresh: refreshToken
};

export default KeycloakService;
