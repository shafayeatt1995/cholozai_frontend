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
          width="400"
          height="225"
          format="webp"
          class="object-cover transition-all size-full"
          fit="cover"
          loading="lazy"
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
            class="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900 capitalize"
            >{{ post.title }}</span
          >
        </nuxt-link>
      </h2>
      <div
        class="mt-3 flex items-center text-gray-500 dark:text-gray-400 gap-2"
      >
        <p class="flex items-center gap-1">
          <span class="truncate text-sm">Shafayet Al-Anik</span>
        </p>
        <p class="text-xs text-gray-300 dark:text-gray-600">•</p>
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
