<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
      <div class="mb-6 flex justify-center">
        <div class="p-4 bg-blue-50 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Робота завершена</h1>
      <p class="text-gray-600 mb-8 text-lg">
        Ви успішно вийшли з додатку. Для безпеки рекомендується закрити вікно браузера.
      </p>
      <button 
        @click="goToHome"
        class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow-md cursor-pointer"
      >
        Повернутися на головну
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    goToHome() {
      // Перенаправлення на головну з повною перезавантаженням сторінки
      window.location.href = window.location.origin + window.location.pathname;
    }
  }
}
</script>
