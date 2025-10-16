<template>
  <div :class="{ dark: isDark }">
    <div class="relative min-h-screen transition-colors duration-500 overflow-hidden">

      <div class="fixed inset-0 z-0 css-animation-bg">
        <ul class="circles"></ul>
        <ul class="circles-alt"></ul>
        <ul class="circles-3"></ul>

        <div class="absolute inset-0 bg-gradient-to-br from-[#0D324C]/70 via-[#0D324C]/40 to-[#EA580C]/40 blur-3xl opacity-70 animate-gradient"></div>
      </div>

      <div id="custom-cursor"></div>

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

  const createElements = (selector, count, minSize, maxSize) => {
    const container = document.querySelector(selector);
    for (let i = 0; i < count; i++) {
      const li = document.createElement('li');
      const size = Math.random() * (maxSize - minSize) + minSize;
      li.style.width = `${size}px`;
      li.style.height = `${size}px`;
      li.style.left = `${Math.random() * 100}%`;
      li.style.animationDelay = `${Math.random() * 5}s`;
      li.style.animationDuration = `${15 + Math.random() * 20}s`;
      container.appendChild(li);
    }
  };

  createElements('.circles', 12, 15, 80);
  createElements('.circles-alt', 8, 20, 100);
  createElements('.circles-3', 6, 30, 90);

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
.css-animation-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
background: linear-gradient(120deg, rgba(13, 50, 76, 0.3),#fdbb7430, #32414e30 ,#ea5a0c30,#0890b230 ,#ffa34030);
background-size: 200% 200%;
animation: gradient-move 18s ease infinite;
}

#custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 25px;
  height: 25px;
  background: radial-gradient(circle, rgba(234,88,12,0.7), rgba(13,50,76,0.7));
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition: transform 0.2s ease, width 0.3s, height 0.3s, background 0.4s;
  z-index: 9999;
}
#custom-cursor.hovered {
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(13,50,76,0.8), rgba(234,88,12,0.8));
}

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

.circles li {
  position: absolute;
  background: linear-gradient(135deg, rgba(13,50,76,0.2), rgba(234,88,12,0.2));
  animation: animate-up 22s linear infinite;
  bottom: -100px;
  border-radius: 6px;
  transition: 0.4s ease;
  transform-style: preserve-3d;
  box-shadow: 0 0 15px rgba(13,50,76,0.3);
}
.circles li:hover {
  animation-play-state: paused;
  transform: rotateY(20deg) rotateX(20deg) scale(1.2);
  background: linear-gradient(135deg, rgba(13,50,76,0.7), rgba(234,88,12,0.6));
}

.circles-alt li {
  position: absolute;
  border-radius: 50%;
  background: rgba(234,88,12,0.2);
  animation: animate-down 27s linear infinite;
  top: -150px;
  transition: 0.8s ease;
  box-shadow: 0 0 10px rgba(234,88,12,0.4);
}
.circles-alt li:hover {
  animation-play-state: paused;
  transform: scale(1.3);
  background: rgba(234,88,12,0.7);
}

.circles-3 li {
  position: absolute;
  transform: rotate(45deg);
  background: rgba(13,50,76,0.2);
  animation: animate-diagonal 28s linear infinite;
  transition: 0.5s ease;
  box-shadow: 0 0 15px rgba(13,50,76,0.3);
}
.circles-3 li:hover {
  animation-play-state: paused;
  transform: rotate(45deg) scale(1.2);
  background: rgba(13,50,76,0.7);
}

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
