<template>
  <div>
    <div v-for="division in divisions" :key="division.name">
      <nuxt-link
        class="flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4 text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-all duration-200"
        :to="{
          name: 'division-name-page',
          params: { name: division.slug, page: 1 },
        }"
        ><span> {{ division.name }}</span></nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["divisions"]),
  },
};
</script>
