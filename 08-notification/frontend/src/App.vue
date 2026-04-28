<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';
import pusher from '@/services/pusher';

const toast = useToast();

onMounted(() => {
  const channel = pusher.subscribe('notifications');
  channel.bind('category-created', (data) => {
    toast.success(`${data.message}\n${data.description}` || 'Нова категорія створена!');
  });
});

onUnmounted(() => {
  pusher.unsubscribe('notifications');
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-3 group">
              <img src="/vite.svg" class="h-8 w-8 group-hover:scale-110 transition-transform" alt="Logo" />
              <span class="text-xl font-bold text-gray-900 tracking-tight">Notification System</span>
            </router-link>
          </div>
          
          <nav class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              active-class="text-blue-600 bg-blue-50"
            >
              Головна
            </router-link>
            <template v-if="$store?.authenticated">
              <router-link 
                to="/categories" 
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                Категорії
              </router-link>
              <router-link 
                to="/profile" 
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                Мій профіль
              </router-link>
              <div class="h-6 w-px bg-gray-200 mx-2"></div>
              <button 
                @click="$store?.logout" 
                class="text-sm font-medium text-red-600 hover:text-red-700 px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
              >
                Вийти
              </button>
            </template>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex-grow py-8 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>

    <footer class="bg-white border-t border-gray-200 py-6">
      <div class="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
        &copy; 2024 Notification Demo. Побудовано з Vue 3 та Keycloak.
      </div>
    </footer>
  </div>
</template>
