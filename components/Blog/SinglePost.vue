<template>
  <div class="group cursor-pointer">
    <div
      class="overflow-hidden rounded-md bg-gray-100 transition-all duration-200 hover:scale-105 dark:bg-gray-800"
    >
      <nuxt-link
        class="relative block aspect-video"
        :to="{ name: 'blog-post-slug', params: { slug: post.slug } }"
      >
        <nuxt-img
          :src="`/images/blog/${post.image}`"
          :alt="post.title"
          format="webp"
          class="object-cover transition-all"
          loading="lazy"
          decoding="async"
          style="
            position: absolute;
            height: 100%;
            width: 100%;
            inset: 0px;
            color: transparent;
          "
        />
      </nuxt-link>
    </div>
    <div>
      <div class="flex gap-3 justify-between">
        <nuxt-link
          :to="{
            name: 'district-name-page',
            params: { name: post.district, page: 1 },
          }"
          class="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-blue-600"
          >{{ post.district }}</nuxt-link
        >
      </div>
      <h2
        class="text-lg font-semibold leading-snug tracking-tight mt-2 dark:text-white"
      >
        <nuxt-link
          :to="{ name: 'blog-post-slug', params: { slug: post.slug } }"
        >
          <span
            class="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"
            >{{ post.title }}</span
          >
        </nuxt-link>
      </h2>
      <div
        class="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400"
      >
        <div class="flex items-center gap-3">
          <span class="truncate text-sm">Shafayet Al-Anik</span>
        </div>
        <span class="text-xs text-gray-300 dark:text-gray-600">•</span>
        <time class="truncate text-sm">{{ post.postDate | cDate }}</time>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SinglePost",
  props: { post: Object },
};
</script>
