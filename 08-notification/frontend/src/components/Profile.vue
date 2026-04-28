<script>
import api, { kcApi } from "@services/api";

export default {
  name: "Profile",
  data() {
    return {
      fullProfile: null,
      loading: false,
      error: null
    };
  },
  computed: {
    user() {
      return this.$store?.user || {};
    }
  },
  created() {
    this.fetchKeycloakData();
  },
  methods: {
    async fetchKeycloakData() {
      if (!this.user.id) return;
      
      this.loading = true;
      this.error = null;
      try {
        // Direct call to Keycloak Admin REST API for full user data
        const response = await kcApi.get(`/users/${this.user.id}`);
        this.fullProfile = response.data;
      } catch (err) {
        console.error("Failed to fetch Keycloak data:", err);
        this.error = "Не вдалося завантажити детальні дані користувача з Keycloak REST API. Перевірте CORS та права доступу (view-users).";
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8 flex items-center justify-between">
      <router-link to="/" class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад на головну
      </router-link>
      <button @click="fetchKeycloakData" class="text-sm text-blue-600 hover:underline" :disabled="loading">
        {{ loading ? 'Оновлення...' : 'Оновити дані' }}
      </button>
    </div>

    <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Профіль користувача</h1>
    
    <div class="space-y-8">
      <!-- Основна інформація -->
      <div class="card">
        <div class="flex items-center space-x-6 mb-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
          <div class="bg-blue-600 h-20 w-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg transform -rotate-3">
            {{ user.username?.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ user.username }}</h2>
            <p v-if="user.email" class="text-gray-500 font-medium">{{ user.email }}</p>
            <p class="text-xs text-gray-400 mt-1 font-mono">ID: {{ user.id }}</p>
          </div>
        </div>

        <div class="space-y-6">
          <h3 class="text-xl font-bold flex items-center text-gray-800 border-b border-gray-100 pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Деталі сесії
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span class="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">Статус автентифікації</span>
              <div class="flex items-center">
                <span :class="['h-2.5 w-2.5 rounded-full mr-2', $store?.authenticated ? 'bg-green-500 animate-pulse' : 'bg-red-500']"></span>
                <span class="font-bold text-gray-700">
                  {{ $store?.authenticated ? 'Активний' : 'Неактивний' }}
                </span>
              </div>
            </div>
            
            <div v-if="user.roles && user.roles.length > 0" class="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span class="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-2">Глобальні ролі (Realm)</span>
              <div class="flex flex-wrap gap-2">
                <span v-for="role in user.roles" :key="role" 
                      class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md border border-blue-200">
                  {{ role }}
                </span>
              </div>
            </div>
          </div>

          <!-- Клієнтські ролі -->
          <div v-if="user.resourceRoles && Object.keys(user.resourceRoles).length > 0" class="space-y-4">
            <label class="text-sm font-bold text-gray-500 ml-1 uppercase tracking-wider">Ролі додатків (Client Roles)</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(client, clientName) in user.resourceRoles" :key="clientName" 
                   class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span class="text-indigo-600 text-xs font-black uppercase tracking-tighter block mb-2">{{ clientName }}</span>
                <div class="flex flex-wrap gap-2">
                  <span v-for="role in client.roles" :key="role" 
                        class="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded border border-indigo-100">
                    {{ role }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-500 ml-1 uppercase tracking-wider">Access Token</label>
              <pre class="bg-gray-900 p-5 rounded-xl text-xs font-mono text-blue-300 overflow-x-auto break-all max-h-32 border border-gray-800 shadow-inner">{{ user.token }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Keycloak Full User Data -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
        {{ error }}
      </div>

      <div v-if="fullProfile" class="grid grid-cols-1 gap-8">
        <section class="card">
          <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
            Full User Data (Admin API)
          </h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden">
            <pre class="p-4 text-xs font-mono text-indigo-300 overflow-auto max-h-96 custom-scrollbar">{{ JSON.stringify(fullProfile, null, 2) }}</pre>
          </div>
        </section>
      </div>

      <div v-else-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
      </div>

      <div class="pt-6">
        <button type="button" class="btn-danger w-full md:w-auto px-8 shadow-lg shadow-red-200" @click="$store.logout">
          Вийти з системи
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-800;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-700 rounded-full hover:bg-gray-600 transition-colors;
}
</style>
