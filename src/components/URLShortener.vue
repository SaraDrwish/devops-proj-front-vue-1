<template>
  <div
    class="dark:bg-gray-900 rounded-lg shadow-lg shadow-orange-200 dark:border-4 dark:border-orange-500 
   rounded-xl p-8 w-full max-w-md backdrop-blur-md"
  >
    <h2
      class="text-2xl font-bold mb-4 text-cyan-600 dark:text-orange-300 text-center bg-gradient-to-r from-[#0D324C] to-[#EA580C] dark:from-[#1788B2] dark:to-[#F49C52] bg-clip-text text-transparent"
    >
      URL Shortener
    </h2>

    <input
      type="text"
      v-model="longUrl"
      placeholder="https://example.com"
      class="w-full p-3 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4 bg-gray-50 dark:bg-gray-800 
      dark:border-gray-600 dark:text-white text-orange-500 dark:placeholder-orange-400 placeholder-sky-300 bg-orange-100"
    />

    <button
      type="button"
      @click="shorten"
      class="w-full bg-orange-600 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded-md transition transform hover:scale-105"
    >
      Shorten URL
    </button>

    <p
      id="result"
      class="mt-4 text-center font-medium text-sky-700 dark:text-orange-300"
      v-html="result"
    ></p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const longUrl = ref("");
const result = ref("");
async function shorten() {
  if (!longUrl.value) {
    result.value = `<span class="text-red-600 dark:text-red-400">❌ Error:</span> Please enter a URL first!`;
    return;
  }

  result.value = 'Processing...';
  await new Promise(resolve => setTimeout(resolve, 1000));

  const short_url = `https://short.url/${Math.random().toString(36).substring(2, 8)}`;
  result.value = `
    <span class="text-green-600 dark:text-green-400">✅ Shortened:</span>
    <a href="${short_url}" target="_blank" class="text-blue-600 dark:text-blue-400 underline">${short_url}</a>
  `;
}

</script>
