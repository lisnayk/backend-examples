<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Обробка входу...</h2>
      <p class="text-gray-600">Будь ласка, зачекайте, поки ми завершуємо вашу авторизацію.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {

  // Keycloak handling usually happens in keycloak.js init.
  // This component is mostly a placeholder while the redirect/init is happening.
  
  // Check if we are authenticated and redirect to home
  const checkAuthAndRedirect = () => {
    if (authStore.authenticated) {
      console.log('User authenticated, redirecting to home...');
      router.push('/');
      return true;
    }
    return false;
  };

  // Try immediately
  if (checkAuthAndRedirect()) return;

  // Poll for authentication status for a few seconds
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (checkAuthAndRedirect() || attempts > 20) {
      clearInterval(interval);
      if (attempts > 20 && !authStore.isAuthenticated) {
        console.warn('Authentication timeout, redirecting to home anyway');
        router.push('/');
      }
    }
  }, 50);
});
</script>
