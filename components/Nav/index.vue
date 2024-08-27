<template>
  <nav>
    <div class="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
      <div
        class="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end"
      >
        <nuxt-link
          :to="{ name: 'index' }"
          class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
          >Home</nuxt-link
        >
        <a
          class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
          target=""
          rel=""
          href="/about"
          >Travel Bangladesh</a
        ><a
          class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
          target=""
          rel=""
          href="/contact"
          >Popular Places</a
        >
      </div>
      <div class="flex w-full items-center justify-between md:w-auto">
        <a href="/">
          <img
            alt="Logo"
            decoding="async"
            class="w-40"
            src="/full-logo-tr.webp"
        /></a>
      </div>
      <div
        class="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row"
      >
        <a
          class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
          target=""
          rel=""
          href="/archive"
        >
          Blog</a
        >
        <a
          class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
          target="_blank"
          rel="noopener"
          href="https://stablo-pro.web3templates.com/"
        >
          Hotel & Resort</a
        >
        <a
          class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
          target="_blank"
          rel="noopener"
          href="https://stablo-pro.web3templates.com/"
        >
          Contact Us</a
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>
