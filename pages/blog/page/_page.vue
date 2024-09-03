<template>
  <div class="container mx-auto">
    <div
      class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
      v-if="posts && posts.length"
    >
      <BlogSinglePost
        v-for="(post, key) in posts"
        :key="key + 'i'"
        :post="post"
      />
    </div>
    <div v-else class="w-full flex flex-col justify-center items-center">
      <div ref="empty" class="h-96"></div>
      <h1 class="text-3xl font-bold">No Blog post found</h1>
    </div>
    <div
      class="mt-10 flex items-center justify-center"
      v-if="posts && posts.length"
    >
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
        <button
          v-if="pageNumber == 1"
          disabled
          class="relative flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
        >
          <i class="fa-solid fa-angle-left text-xs"></i>
          <span>Previous</span>
        </button>
        <nuxt-link
          v-else
          :to="{ name: 'blog-page-page', params: { page: pageNumber - 1 } }"
          class="relative flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
        >
          <i class="fa-solid fa-angle-left text-xs"></i>
          <span>Previous</span>
        </nuxt-link>
        <nuxt-link
          v-if="posts && posts.length === 18"
          :to="{ name: 'blog-page-page', params: { page: pageNumber + 1 } }"
          class="relative flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
        >
          <span>Next</span>
          <i class="fa-solid fa-angle-right text-xs"></i>
        </nuxt-link>
        <button
          v-else
          disabled
          class="relative flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
        >
          <span>Next</span>
          <i class="fa-solid fa-angle-right text-xs"></i>
        </button>
      </nav>
    </div>
    <div v-else class="flex justify-center items-center"></div>
  </div>
</template>

<script>
import axios from "axios";
import { initLottie, meta } from "@/utils";
export default {
  name: "BlogPage",
  head() {
    const title = `Blog - Page ${this.page} | ${this.$pageTitle}`;
    const description = `Explore a diverse range of travel information on CholoZai. From travel tips and destination guides to cultural insights. page number ${this.page}.`;

    return {
      title,
      meta: meta({ title, description }),
    };
  },
  async asyncData(context) {
    try {
      const { store, error, route } = context;
      const { params } = route;
      const { apiUrl } = store.getters;
      const page = params?.page || 1;
      let res = await axios.get(`${apiUrl}/fetch/posts/${page}`);
      if (res.data) {
        const { posts } = res.data;
        return { posts, page };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (err) {
      console.error(err);
      const { error } = context;
      error({
        statusCode: 500,
        message: "Something wrong. Please try again 2",
      });
    }
  },
  data() {
    return {
      posts: [],
      page: 1,
    };
  },
  computed: {
    pageNumber() {
      return +this.$route.params.page;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.empty) {
        initLottie(this.$refs.empty, "/lottie/empty.json");
      }
    });
  },
};
</script>
