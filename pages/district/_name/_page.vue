<template>
  <div>
    <PageName />
    <div class="container mx-auto">
      <div
        class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-10"
        v-if="posts && posts.length"
      >
        <LocationSinglePost
          v-for="(post, key) in posts"
          :key="key + 'i'"
          :post="post"
        />
      </div>
      <div v-else class="w-full flex flex-col justify-center items-center">
        <div ref="empty" class="h-96"></div>
        <h1 class="text-3xl font-bold">No location post found</h1>
      </div>
      <Paginate :posts="posts" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { initLottie, meta } from "@/utils";
export default {
  name: "LocationPage",
  head() {
    const title = `visiting place in ${this.name} District - Page ${this.page} | ${this.$pageTitle}`;
    const description = `Explore our ${this.name} district featuring insightful articles and guides. Discover top destinations, tips, and more. page number ${this.page}.`;
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
      const { name, page } = params;
      let res = await axios.get(
        `${apiUrl}/fetch/posts-district/${name}/${page}`
      );
      if (res.data) {
        const { posts } = res.data;
        return { posts, name, page };
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
      name: "",
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
