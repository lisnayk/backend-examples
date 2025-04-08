// src/keycloak.ts
import Keycloak from 'keycloak-js';
import { useAuthStore } from '@/stores/auth.ts'

const keycloak = new Keycloak({
  url: 'http://localhost:8080/', // URL Keycloak-сервера
  realm: 'znu',
  clientId: 'js-client',
});


export const initializeKeycloak = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    keycloak
      .init()
      .then((authenticated) => {
        resolve(authenticated);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default keycloak;

