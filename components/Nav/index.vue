<template>
  <div
    class="dark:bg-gray-900/50 bg-white/50 backdrop-blur-md sticky top-0 z-20 shadow-md"
  >
    <div class="container mx-auto py-1">
      <nuxt-link
        :to="{ name: 'index' }"
        class="md:hidden flex w-full items-center justify-between px-2"
        title="cholozai"
      >
        <nuxt-img
          loading="lazy"
          decoding="async"
          alt="Logo"
          title="Logo"
          class="w-[160px] h-[65px]"
          src="/full-logo-tr.webp"
          width="240"
          height="98"
          format="webp"
          fit="cover"
        />
        <button
          class="p-2 text-2xl"
          @click="showMenu = !showMenu"
          aria-label="Toggle menu"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
      </nuxt-link>
      <div
        class="flex flex-col md:flex-row justify-between items-center flex-nowrap md:gap-5 lg:gap-10 absolute md:relative dark:bg-gray-900/50 md:dark:bg-transparent bg-white/50 md:bg-transparent backdrop-blur-md md:backdrop-blur-none w-full md:w-auto mt-1 md:mt-0"
      >
        <div
          class="order-1 w-full md:items-center justify-start md:order-none md:flex flex-col md:flex-row md:w-auto md:flex-1 md:justify-end"
          :class="showMenu ? '' : 'hidden'"
        >
          <nuxt-link
            :to="{ name: 'index' }"
            title="cholozai"
            class="px-3 py-2 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-500"
            >Home</nuxt-link
          >
          <div class="relative text-left">
            <button
              class="flex px-3 py-2 text-sm font-medium dark:text-white hover:text-blue-500 gap-2 items-center"
              type="button"
              :class="
                show === 'travel'
                  ? 'text-blue-500'
                  : 'text-gray-800 dark:text-gray-400'
              "
              @click="show = show === 'travel' ? '' : 'travel'"
            >
              <span>Divisions</span>
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            <transition name="fade" mode="out-in">
              <div
                class="z-20 origin-top-left rounded-md focus:outline-none absolute left-0 top-11 md:top-[54px] w-full md:w-48 shadow-lg dark:bg-gray-800 bg-white"
                v-if="show === 'travel'"
                v-click-outside="() => (show = '')"
              >
                <div class="px-2 py-1 grid grid-cols-2 md:grid-cols-1">
                  <div v-for="division in divisions" :key="division.name">
                    <nuxt-link
                      class="flex items-center space-x-2 px-3 py-2 text-sm lg:space-x-4 text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-all duration-200"
                      :to="{
                        name: 'division-name-page',
                        params: { name: division.slug, page: 1 },
                      }"
                      :title="division.name"
                      ><span> {{ division.name }}</span></nuxt-link
                    >
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="relative text-left">
            <button
              class="flex px-3 py-2 text-sm font-medium dark:text-white hover:text-blue-500 gap-2 items-center"
              type="button"
              :class="
                show === 'district'
                  ? 'text-blue-500'
                  : 'text-gray-800 dark:text-gray-400'
              "
              @click="show = show === 'district' ? '' : 'district'"
            >
              <span>Districts</span>
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            <transition name="fade" mode="out-in">
              <div
                class="z-20 origin-top-left rounded-md focus:outline-none absolute left-0 top-11 md:top-[54px] w-full md:w-[600px] shadow-lg dark:bg-gray-800 bg-white"
                v-if="show === 'district'"
                v-click-outside="() => (show = '')"
              >
                <div
                  class="px-2 py-1 grid md:grid-cols-4 grid-cols-2 max-h-[450px] md:max-h-max overflow-y-auto md:overflow-y-clip"
                >
                  <div v-for="district in districts" :key="district.name">
                    <nuxt-link
                      class="flex items-center space-x-2 px-3 py-2 text-sm lg:space-x-4 text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-all duration-200"
                      :to="{
                        name: 'district-name-page',
                        params: { name: district.name, page: 1 },
                      }"
                      :title="district.name"
                      ><span> {{ district.name }}</span></nuxt-link
                    >
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div
          class="hidden md:flex w-full items-center justify-between md:w-auto px-2 md:px-0"
        >
          <nuxt-link :to="{ name: 'index' }" title="cholozai">
            <nuxt-img
              loading="lazy"
              decoding="async"
              alt="Logo"
              title="Logo"
              class="w-[160px] h-[65px]"
              src="/full-logo-tr.webp"
              width="240"
              height="98"
              format="webp"
              fit="cover"
          /></nuxt-link>
        </div>
        <div
          class="order-1 w-full flex-col md:items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row"
          :class="showMenu ? 'flex' : 'hidden'"
        >
          <nuxt-link
            class="px-3 py-2 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-500"
            :to="{ name: 'tour-guide' }"
            title="Tour guide page"
            >Tour Guide
          </nuxt-link>
          <nuxt-link
            class="px-3 py-2 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-500"
            :to="{ name: 'location-page-page', params: { page: 1 } }"
            title="location page"
          >
            Locations</nuxt-link
          >
          <nuxt-link
            class="px-3 py-2 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-500"
            :to="{ name: 'about' }"
            title="About us page"
          >
            About Us</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapGetters } from "vuex";
export default {
  name: "Nav",
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      show: "",
      showMenu: false,
    };
  },
  computed: {
    ...mapGetters(["divisions", "districts"]),
  },
  watch: {
    $route() {
      this.show = "";
      this.showMenu = false;
    },
  },
};
</script>
