<script>
import api from "@services/api";

export default {
  data() {
    return {
      loading: false,
      categories: [],
      error: null
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get("/categories");
        // nestjs-typeorm-paginate returns items in 'items' field
        this.categories = res.data.items || [];
      } catch (err) {
        this.error = "Не вдалося завантажити категорії. Перевірте консоль або права доступу.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-10 text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-2">08-Notification Frontend</h1>
      <p class="text-gray-500">Система сповіщень на основі NestJS та Keycloak</p>
    </div>

    <main class="space-y-8">
      <section class="card">
        <h2 class="text-2xl font-bold mb-6 flex items-center text-gray-800">
          <span class="bg-blue-600 w-1.5 h-8 rounded-full mr-4"></span>
          Категорії з Node-App
        </h2>
        
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600 mb-4"></div>
          <span class="text-gray-500 font-medium">Завантаження даних...</span>
        </div>
        
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-medium">{{ error }}</span>
          </div>
          <button @click="fetchCategories" class="btn-secondary text-sm">Повторити</button>
        </div>

        <div v-if="!loading && categories.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="category in categories" :key="category.id" 
               class="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all group">
            <div class="h-40 bg-gray-200 relative overflow-hidden">
              <img v-if="category.image" 
                   :src="category.image.startsWith('http') ? category.image : `/images/${category.image}`" 
                   :alt="category.name"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   @error="(e) => e.target.src = 'https://placehold.co/400x200?text=' + category.name"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
              </div>
              <div class="absolute top-3 left-3">
                <span class="bg-white/90 backdrop-blur-sm text-blue-600 font-bold px-2.5 py-1 rounded-lg text-xs shadow-sm">
                  #{{ category.id }}
                </span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{{ category.name }}</h3>
              <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">{{ category.description }}</p>
            </div>
          </div>
        </div>
        
        <div v-else-if="!loading && !error" class="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p class="text-gray-400 font-medium">Категорій не знайдено.</p>
        </div>
      </section>

      <section class="card bg-blue-50/30 border-dashed border-blue-200">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 class="text-lg font-bold text-blue-900 mb-1">Інструменти розробника</h3>
            <p class="text-sm text-blue-700/70">Керування сесією та даними API</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button type="button" class="btn-secondary shadow-sm" @click="$store.refreshUserToken">
              Оновити токен
            </button>
            <button type="button" class="btn-primary shadow-md" @click="fetchCategories" :disabled="loading">
              Оновити дані
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
</style>
