<template>
  <div>
    <div
      class="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 !pt-0"
    >
      <div class="mx-auto max-w-screen-md">
        <div class="flex justify-center">
          <div class="flex gap-3">
            <p
              class="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-emerald-700"
            >
              {{ post.district }}
            </p>
          </div>
        </div>
        <h1
          class="text-brand-primary mb-3 mt-2 text-center text-3xl font-bold tracking-tight dark:text-white lg:text-4xl lg:leading-snug"
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
      </div>
    </div>
    <div
      class="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg"
    >
      <nuxt-img
        :src="`/images/blog/${post.image}`"
        :alt="post.title"
        format="webp"
        loading="lazy"
        decoding="async"
        class="object-cover w-full"
        style="
          position: absolute;
          height: 100%;
          width: 100%;
          inset: 0px;
          color: transparent;
        "
      />
    </div>
    <div
      class="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 flex"
    >
      <div class="w-[160px]">
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
      <div class="w-[160px]">
        <div class="sticky top-24 w-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BlogPost",
  async asyncData(context) {
    try {
      const { store, error, route } = context;
      const { params } = route;
      const { apiUrl } = store.getters;
      const slug = params.slug;
      let res = await axios.get(`${apiUrl}/fetch/post/${slug}`);
      if (res.data) {
        const { post } = res.data;
        return { post };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (err) {
      console.log(err);
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
    };
  },
};
</script>
