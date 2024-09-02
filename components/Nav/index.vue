<template>
  <div class="bg-white/50 backdrop-blur-md sticky top-0 z-10">
    <div class="container mx-auto py-5 lg:py-2">
      <div class="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
        <div
          class="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end"
        >
          <nuxt-link
            :to="{ name: 'index' }"
            class="px-5 py-2 text-sm font-medium text-gray-800 hover:text-blue-500 dark:text-gray-400"
            >Home</nuxt-link
          >
          <div class="relative text-left">
            <button
              class="flex px-5 py-2 text-sm font-medium text-gray-800 hover:text-blue-500 gap-2 items-center"
              type="button"
              :class="
                show === 'travel' ? 'text-blue-500' : 'dark:text-gray-400'
              "
              @click="show = show === 'travel' ? '' : 'travel'"
            >
              <span>Travel Bangladesh</span>
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            <transition name="fade" mode="out-in">
              <div
                class="z-20 origin-top-left rounded-md focus:outline-none lg:absolute lg:left-0 lg:top-[58px] lg:w-56 shadow-lg dark:bg-gray-800 bg-white"
                v-if="show === 'travel'"
              >
                <div class="px-2 py-1">
                  <div
                    v-for="division in divisions"
                    :key="division._id"
                    class=""
                  >
                    <a
                      class="flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4 text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300 hover:bg-gray-100 rounded-md transition-all duration-200"
                      href="/"
                      ><span> {{ division.name }}</span></a
                    >
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <a
            class="px-5 py-2 text-sm font-medium text-gray-800 hover:text-blue-500 dark:text-gray-400"
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
            class="px-5 py-2 text-sm font-medium text-gray-800 hover:text-blue-500 dark:text-gray-400"
            target=""
            rel=""
            href="/archive"
          >
            Blog</a
          >
          <a
            class="px-5 py-2 text-sm font-medium text-gray-800 hover:text-blue-500 dark:text-gray-400"
            target="_blank"
            rel="noopener"
            href="https://stablo-pro.web3templates.com/"
          >
            Hotel & Resort</a
          >
          <a
            class="px-5 py-2 text-sm font-medium text-gray-800 hover:text-blue-500 dark:text-gray-400"
            target="_blank"
            rel="noopener"
            href="https://stablo-pro.web3templates.com/"
          >
            Contact Us</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Nav",
  data() {
    return {
      show: "",
    };
  },
  computed: {
    ...mapGetters(["divisions"]),
  },
};
</script>
