<template>
  <div class="container mx-auto">
    <div class="flex justify-center mb-10">
      <nuxt-img
        :src="`/images/blog/${post.image}`"
        :alt="post.title"
        format="webp"
        class="object-cover md:w-2/3"
      />
    </div>

    <div class="flex flex-col lg:flex-row gap-5 md:gap-10">
      <div class="flex-1">
        <LanguageSwitch />
        <div class="flex flex-col md:flex-row justify-between md:items-center">
          <h1
            class="text-3xl md:text-4xl font-bold tracking-tight dark:text-white lg:leading-snug capitalize"
          >
            <EditMode v-model="post.bnTitle" />
          </h1>

          <nuxt-link
            class="text-sm font-semibold uppercase text-blue-600 mt-2"
            :to="{
              name: 'district-name-page',
              params: { name: post.district, page: 1 },
            }"
          >
            {{ post.district }}
          </nuxt-link>
        </div>
        <div class="flex items-center justify-between gap-2 mb-7">
          <div class="flex items-center text-sm gap-2">
            <p class="text-gray-800 dark:text-gray-400">শাফায়েত আল-অনিক</p>
            ·
            <time class="truncate text-sm">{{
              post.postDate | cDate("bn")
            }}</time>
          </div>
        </div>
        <div
          class="flex justify-between items-center w-full mb-10"
          v-if="isDev"
        >
          <div>
            <p @click="copyText(post._id)" class="cursor-pointer">
              {{ post._id }}
            </p>
            <a :href="post.url" target="_blank">{{ post.url }}</a>
          </div>
          <!-- <form @submit.prevent="submit">
            <input
              type="text"
              v-model="title"
              class="border w-full h-20 bg-blue-600 text-white mt-10"
              @click="paste"
            />
          </form> -->
        </div>
        <div
          v-for="(content, key) in post.bnContent"
          :key="`content-${key}`"
          class="mb-7 relative"
        >
          <div class="absolute right-0 top-0 flex gap-5 text-xl" v-if="isDev">
            <i class="fa-regular fa-copy cursor-pointer" @click="copy(key)"></i>
            <i
              class="fas fa-trash-can cursor-pointer"
              @click="deleteContent(key)"
            ></i>
          </div>
          <h2
            v-if="content.title"
            class="text-2xl font-bold mb-2 tracking-tight"
          >
            <EditMode v-model="content.title" />
          </h2>
          <h2
            v-else-if="key === 0"
            class="text-2xl font-bold mb-2 capitalize tracking-tight"
          >
            Introduction to {{ post.title }}
          </h2>
          <article class="mb-10">
            <div
              v-for="(article, i) in content.content"
              :key="`article-${i}`"
              class="mb-4"
            >
              <EditMode v-model="content.content[i]" tagName="div" />
            </div>
          </article>
          <hr v-if="key + 1 !== post.content.length" />
        </div>
        <div class="flex justify-between gap-10" v-if="isDev">
          <Button class="w-full" @click.native.prevent="updatePost"
            >Update</Button
          >
          <Button class="w-full" @click.native.prevent="refetch"
            >Refetch</Button
          >
        </div>
      </div>
      <div class="lg:w-80">
        <h2 class="md:text-4xl text-3xl font-bold mb-3">Related Post</h2>
        <div class="grid md:grid-cols-3 lg:grid-cols-1 gap-5 lg:gap-10">
          <BlogSinglePostBn
            v-for="(post, key) in related"
            :key="key + 'i'"
            :post="post"
          />
        </div>
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
    const title = `${this.post.bnTitle} | ${this.$pageTitle}`;
    const description =
      this.post?.bnContent[0]?.content[0]?.split(".")?.slice(2)?.join(". ") ||
      "Discover the beauty of Bangladesh with our travel blog. Explore top destinations, hidden gems, cultural experiences, and travel tips for an unforgettable journey through this vibrant country.";
    const mainEntity = this.post.bnContent
      .filter(({ title }) => title && title.length)
      .map(({ title, content }) => ({
        "@type": "Question",
        name: `${title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: content.join(" "),
        },
      }));
    return {
      title,
      meta: meta({ title, description }),
      script: [
        {
          type: "application/ld+json",
          json: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity,
          },
        },
      ],
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
        const { post, related } = res.data;
        return { post, related };
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
      related: {},
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
        // await this.$axios.$post(`${this.$api}/scrap/update-post-slug`, {
        //   title: this.title,
        //   post: this.post,
        // });
        this.title = "";
      } catch (error) {}
    },
    async updatePost() {
      try {
        await this.$axios.$post(
          `${this.$api}/scrap/update-post-manually`,
          this.post
        );
        this.title = "";
      } catch (error) {}
    },
    async refetch() {
      try {
        await this.$axios.$get(
          `${this.$api}/scrap/refetch/bn/${this.post.slug}`
        );
      } catch (error) {}
    },
    copy(i) {
      this.post.content.splice(i, 0, this.post.content[i]);
    },
    deleteContent(i) {
      this.post.content.splice(i, 1);
    },
  },
};
</script>
