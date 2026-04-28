import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    server: {
      port: env.VITE_APP_PORT,
      host: true,
      allowedHosts: ['frontend', 'demo-app.local'],
      origin: 'http://demo-app.local',
      hmr: {
        host: 'demo-app.local',
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url))
      }
    }
  }
});
