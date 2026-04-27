import axios from "axios";

// Creating an instance for axios to be used by the token interceptor service
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const kcApi = axios.create({
  baseURL: `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${import.meta.env.VITE_KEYCLOAK_REALM}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;