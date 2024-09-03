<template>
  <div class="container mx-auto">
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      <BlogSinglePost
        v-for="(post, key) in posts"
        :key="key + 'i'"
        :post="post"
      />
    </div>
    <div class="mt-10 flex items-center justify-center">
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
        <button
          disabled
          class="relative flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
        >
          <i class="fa-solid fa-angle-left text-xs"></i>
          <span>Previous</span>
        </button>
        <nuxt-link
          :to="{ name: 'blog-page-page', params: { page: 1 } }"
          class="relative flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
        >
          <span>Next</span>
          <i class="fa-solid fa-angle-right text-xs"></i>
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { meta } from "@/utils";
export default {
  name: "IndexPage",
  head() {
    return {
      title: `Home | ${this.$pageTitle}`,
      meta: meta(),
    };
  },
  async asyncData(context) {
    try {
      const { store, error } = context;
      const { apiUrl } = store.getters;
      let res = await axios.get(`${apiUrl}/fetch/posts/3`);
      if (res.data) {
        const { posts } = res.data;
        return { posts };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (err) {
      const { error } = context;
      error({ statusCode: 500, message: "Something wrong. Please try again" });
    }
  },
  data() {
    return {
      posts: [],
    };
  },
};
</script>
