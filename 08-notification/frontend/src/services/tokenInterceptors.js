import axiosInstance, { kcApi } from "@services/api";

const setup = (store) => {
  const requestInterceptor = (config) => {
    // If user is authenticated, place access token in request header.
    if (store.authenticated) {
      config.headers["Authorization"] = `Bearer ${store.user.token}`;
    }

    return config;
  };

  const errorInterceptor = async (error, instance) => {
    const oriConfig = error.config;

    if (error.response?.status === 401 && !oriConfig._retry) {
      oriConfig._retry = true;

      try {
        // Refresh token then retry once
        await store.refreshUserToken();

        // Place refreshed access token in the request header
        oriConfig.headers["Authorization"] = `Bearer ${store.user.token}`;
        return instance(oriConfig);
      } catch (_error) {
        console.error("Refresh token failed");
        console.error(_error);

        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  };

  axiosInstance.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));
  kcApi.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));

  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => errorInterceptor(error, axiosInstance)
  );
  kcApi.interceptors.response.use(
    (res) => res,
    (error) => errorInterceptor(error, kcApi)
  );
};

export default setup;