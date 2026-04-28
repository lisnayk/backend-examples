import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import keycloakService from '@services/keycloak';
import setupInterceptors from '@services/tokenInterceptors';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Styles
import './assets/main.css';
import {useAuthStore} from "./stores/authStore.js";

// Create Pinia instance
const pinia = createPinia();

// Use persisted state with Pinia so our store data will persist even after page refresh
pinia.use(piniaPluginPersistedstate);

const renderApp = () => {
  const app = createApp(App);
  app.use(pinia);
  app.use(Toast);
  
  // Initialize Auth Store
  const store = useAuthStore();
  keycloakService.CallInitStore(store);
  setupInterceptors(store);

  // Make store available globally as $store (legacy support for templates)
  app.config.globalProperties.$store = store;

  // Finalize app setup before mount
  app.use(router);
  app.mount('#app');
}

// Call keycloak service to init on render
keycloakService.CallInit(renderApp);
