<template>
  <div>
    <div
      class="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 !pt-0"
    >
      <div class="mx-auto max-w-screen-md">
        <div class="flex justify-center">
          <div class="flex gap-3">
            <nuxt-link
              class="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-blue-700"
              :to="{
                name: 'district-name-page',
                params: { name: post.district, page: 1 },
              }"
            >
              {{ post.district }}
            </nuxt-link>
          </div>
        </div>
        <h1
          class="text-brand-primary mb-3 mt-2 text-center text-3xl font-bold tracking-tight dark:text-white lg:text-4xl lg:leading-snug capitalize"
        >
          {{ post.title }}
        </h1>
        <div class="flex items-center justify-center gap-2">
          <p class="text-gray-800 dark:text-gray-400">Shafayet Al-Anik</p>
          ·
          <div class="flex items-center text-sm">
            <time class="truncate text-sm">{{ post.postDate | cDate }}</time>
          </div>
        </div>
        <div class="flex justify-between items-center w-full" v-if="isDev">
          <div>
            <p @click="copyText(post._id)" class="cursor-pointer">
              {{ post._id }}
            </p>
            <a :href="post.url" target="_blank">{{ post.url }}</a>
          </div>
          <form @submit.prevent="submit">
            <input
              type="text"
              v-model="title"
              class="border size-96 mt-10"
              @click="paste"
            />
          </form>
        </div>
      </div>
    </div>
    <div
      class="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg"
    >
      <nuxt-img
        :src="`/images/blog/${post.image}`"
        :alt="post.title"
        format="webp"
        class="object-cover w-full"
      />
    </div>
    <div class="container p-4 mx-auto flex">
      <div class="w-[160px] hidden md:block">
        <div class="sticky top-24 w-full"></div>
      </div>
      <div class="flex-1">
        <div
          v-for="(content, key) in post.content"
          :key="`content-${key}`"
          class="my-7"
        >
          <h2 v-if="content.title" class="text-2xl font-bold mb-2">
            {{ content.title }}
          </h2>
          <h2 v-else-if="key === 0" class="text-2xl font-bold mb-2 capitalize">
            Introduction to {{ post.title }}
          </h2>
          <article class="mb-10">
            <p
              v-for="(article, i) in content.content"
              :key="`article-${i}`"
              class="mb-4"
            >
              {{ article }}
            </p>
          </article>
          <hr v-if="key + 1 !== post.content.length" />
        </div>
      </div>
      <div class="w-[160px] hidden md:block">
        <div class="sticky top-24 w-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { meta } from "@/utils";
export default {
  name: "BlogPost",
  head() {
    const title = `${this.post.title} | ${this.$pageTitle}`;
    const description =
      this.post?.content[0]?.content[0]?.split(".")?.slice(2)?.join(". ") ||
      "Discover the beauty of Bangladesh with our travel blog. Explore top destinations, hidden gems, cultural experiences, and travel tips for an unforgettable journey through this vibrant country.";
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
      const slug = params.slug;
      let res = await axios.get(`${apiUrl}/fetch/post/${slug}`);
      if (res.data?.post) {
        const { post } = res.data;
        return { post };
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
      post: {},
      title: "",
    };
  },
  computed: {
    ...mapGetters(["isDev"]),
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text);
    },
    async paste() {
      this.title = await navigator.clipboard.readText();
      this.submit();
    },
    async submit() {
      try {
        await this.$axios.$post(`${this.$api}/scrap/update-post-slug`, {
          title: this.title,
          post: this.post,
        });
        this.title = "";
      } catch (error) {}
    },
  },
};
</script>
