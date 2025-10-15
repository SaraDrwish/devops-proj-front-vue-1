<template>
  <div :class="{ 'dark': isDark }"> 
    <div class="relative min-h-screen transition-colors duration-500 overflow-hidden">
      
      <vue-particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :options="particleOptions"
        class="absolute inset-0 z-0"
      />
      
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
import { ref, onMounted, computed } from 'vue';
 import Header from './components/Header.vue'; 
import Footer from './components/Footer.vue';
import URLShortener from './components/URLShortener.vue';

 import { loadFull } from "tsparticles";

const particlesInit = async (engine) => {
  await loadFull(engine);
};

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
 
  if (localStorage.getItem('theme') === 'dark' || 
     (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});

 
const particleOptions = computed(() => ({
  background: {
    color: { value: 'transparent' }  
  },
  fpsLimit: 60,
  
   interactivity: {
    events: {
      onHover: {
        enable: false, 
      },
      resize: true
    },
    modes: {} 
  },
  
  particles: {
    color: {
      value: isDark.value ? '#ffffff' : '#000000'  
    },
    links: {
      color: isDark.value ? '#ffffff' : '#000000', 
      distance: 150,
      enable: true,
      opacity: 0.1,  
      width: 1
    },
    move: {
      enable: true,  
      outModes: {
        default: 'bounce'
      },
      speed: 1,  
      random: true,  
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 60 
    },
    opacity: {
      value: 0.15  
    },
    shape: {
      type: 'circle' 
    },
    size: {
      value: { min: 1, max: 3 },
      random: true
    }
  },
  detectRetina: true
}));
</script>