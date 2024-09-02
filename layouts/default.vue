<template>
  <div class="dark:bg-slate-900 dark:text-white">
    <div class="selection:bg-blue-600 selection:text-white">
      <Nav />
      <div class="mt-2"></div>
      <Nuxt />
      <Footer />
      <WindowWidth />
    </div>
  </div>
</template>
<script>
export default {
  name: "DefaultLayout",
};
</script>
