<template>
  <!-- هذا الوسم الخارجي يطبق كلاس 'dark' على العنصر الجذر (<html>) -->
  <div :class="{ 'dark': isDark }"> 
    <!-- min-h-screen يضمن تغطية ارتفاع الشاشة بالكامل -->
    <div class="relative min-h-screen transition-colors duration-500 overflow-hidden">
      
      <!-- 💡 المجموعة الأولى: المربعات/الجسيمات الأصلية (تتحرك للأعلى) -->
      <div class="fixed inset-0 z-0 css-animation-bg">
        <ul class="circles">
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
        </ul>
      </div>

      <!-- 💡 المجموعة الثانية: الدوائر الجديدة (تتحرك للأسفل) -->
      <div class="fixed inset-0 z-0 css-animation-bg-alt">
        <ul class="circles-alt">
          <li></li><li></li><li></li><li></li><li></li>
        </ul>
      </div>

      <!-- 💡 المجموعة الثالثة: المعينات/الماس (تتحرك قطريًا) -->
      <div class="fixed inset-0 z-0 css-animation-bg-3">
        <ul class="circles-3">
          <li></li><li></li><li></li><li></li>
        </ul>
      </div>
      
      <!-- المحتوى الرئيسي (طبقة Z-10) -->
      <div class="relative z-10 flex flex-col min-h-screen pt-20 pb-20">
        <!-- المكونات المستوردة -->
        <Header :is-dark="isDark" @toggle-dark-mode="toggleDarkMode" />
        
        <main class="flex-grow flex items-center justify-center p-4">
          <URLShortener />
        </main>
        
        <Footer />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// تأكد أن مسار الاستيراد هذا صحيح: ./components/
import Header from './components/Header.vue'; 
import Footer from './components/Footer.vue';
import URLShortener from './components/URLShortener.vue';

// حالة الدارك مود
const isDark = ref(false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  // تحديث الكلاس على العنصر الجذر (<html>) وتخزين التفضيل
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  // تحميل التفضيل المحفوظ أو تفضيل النظام عند التشغيل
  if (localStorage.getItem('theme') === 'dark' || 
     (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>
