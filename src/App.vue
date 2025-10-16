<template>
  <div :class="{ dark: isDark }">
    <div class="relative min-h-screen transition-colors duration-500 overflow-hidden">

      <!-- خلفية التحريك الكاملة -->
      <div class="fixed inset-0 z-0 css-animation-bg">
        <ul class="circles"></ul>
        <ul class="circles-alt"></ul>
        <ul class="circles-3"></ul>

        <!-- تدرجات شفافة خفيفة -->
        <div class="absolute inset-0 bg-gradient-to-br from-[#0D324C]/80 via-[#0D324C]/60 to-[#EA580C]/50 blur-2xl mix-blend-overlay animate-gradient"></div>
      </div>

      <!-- الكروسر المخصص -->
      <div id="custom-cursor"></div>

      <!-- محتوى الموقع -->
      <div class="relative z-10 flex flex-col min-h-screen pt-20 pb-20">
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
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import URLShortener from './components/URLShortener.vue';

const isDark = ref(false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  if (
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }

  // إنشاء العناصر المتحركة
  const createElements = (selector, count) => {
    const container = document.querySelector(selector);
    for (let i = 0; i < count; i++) {
      const li = document.createElement('li');
      li.style.left = `${Math.random() * 100}%`;
      container.appendChild(li);
    }
  };
  createElements('.circles', 10);
  createElements('.circles-alt', 7);
  createElements('.circles-3', 5);

  // الكروسر المخصص
  const cursor = document.getElementById('custom-cursor');
  window.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.querySelectorAll('*').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
});
</script>

<style>
/* خلفية الموقع */
.css-animation-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

/* تأثير التدرج المتحرك */
@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  background: linear-gradient(120deg, rgba(13,50,76,0.8),#FDBA74, #32414E ,#EA580C,#0891B2 ,#ffa340);
  background-size: 200% 200%;
  animation: gradient-move 15s ease infinite;
  opacity: 0.6;
}

/* الكروسر */
#custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 25px;
  height: 25px;
  background: radial-gradient(circle, rgba(234,88,12,0.8), rgba(13,50,76,0.8));
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition: transform 0.22s ease, width 0.4s, height 0.4s, background 0.4s;
  z-index: 9999;
}
#custom-cursor.hovered {
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(13,50,76,0.8), rgba(234,88,12,0.8));
}

/* الخلفيات المتحركة */
.circles, .circles-alt, .circles-3 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 1;
}

/* مربعات شفافة */
.circles li {
  position: absolute;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, rgba(13,50,76,0.1), rgba(234,88,12,0.1));
  animation: animate-up 20s linear infinite;
  bottom: -150px;
  border-radius: 4px;
  transition: 0.4s ease;
}
.circles li:hover {
  animation-play-state: paused;
  background: linear-gradient(135deg, rgba(13,50,76,0.7), rgba(234,88,12,0.7));
  transform: scale(1.3) rotate(45deg);
}

/* دوائر شفافة */
.circles-alt li {
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(234,88,12,0.1);
  animation: animate-down 25s linear infinite;
  top: -100px;
  transition: 0.5s ease;
}
.circles-alt li:hover {
  animation-play-state: paused;
  background: rgba(234,88,12,0.8);
  transform: scale(1.2);
}

/* مربعات مائلة */
.circles-3 li {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(13,50,76,0.1);
  transform: rotate(45deg);
  animation: animate-diagonal 30s linear infinite;
  transition: 0.5s ease;
}
.circles-3 li:hover {
  animation-play-state: paused;
  background: rgba(13,50,76,0.8);
  transform: rotate(45deg) scale(1.2);
}

/* أنيميشن */
@keyframes animate-up {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
}
@keyframes animate-down {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(-720deg); opacity: 0; }
}
@keyframes animate-diagonal {
  0% { transform: translate(0,0) rotate(45deg); opacity: 1; }
  100% { transform: translate(100vw,-100vh) rotate(720deg); opacity: 0; }
}
</style>
