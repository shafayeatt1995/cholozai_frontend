<template>
  <div>
    <div v-if="show">load</div>
    <div v-for="district in districts" :key="district.name">
      <nuxt-link
        class="flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4 text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-all duration-200"
        :to="{
          name: 'district-name-page',
          params: { name: district.name, page: 1 },
        }"
        ><span> {{ district.name }}</span></nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapGetters(["districts"]),
  },
  mounted() {
    this.login();
  },
  methods: {
    login() {
      let password = prompt("Please enter your password");
      this.show = password === "anik1234";
    },
  },
};
</script>
