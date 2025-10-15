<template>
  <footer class="p-4 bg-cyan-700 dark:bg-sky-900 backdrop-blur-sm fixed bottom-0 left-0 right-0 z-50">
    <div class="container mx-auto text-center text-orange-300 dark:text-orange-500">
      <p>&copy; {{ currentDate }}  || URL Shourtner ||   </p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentDate:new Date().getFullYear().toString() 
    };
  }
};
</script>
