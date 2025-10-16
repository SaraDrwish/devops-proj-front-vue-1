<template>
  <header class="p-4 shadow-lg bg-cyan-600 dark:bg-sky-800/40 backdrop-blur-md 
  fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto flex justify-between items-center">
    <h1 class="text-2xl font-extrabold bg-gradient-to-r from-[#0D324C] to-[#EA580C] dark:from-[#0891B2] dark:to-[#F28C38] bg-clip-text text-transparent transition-all duration-700" >
       URL Shortener
    </h1>
      
      <button @click="$emit('toggle-dark-mode')" class="p-2 rounded-full bg-cyan-400 
      dark:bg-sky-700 text-orange-300 dark:text-orange-600 focus:outline-none 
      transition-transform duration-300 transform hover:scale-110 shadow-md">
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  isDark: Boolean
});
defineEmits(['toggle-dark-mode']);
</script>


<style>

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

</style>