<template>
  <div class="dark:bg-slate-900">
    <div class="selection:bg-blue-600 selection:text-white">
      <Nav />
      <div class="mt-2"></div>
      <Nuxt />
      <div class="mt-5"></div>
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
