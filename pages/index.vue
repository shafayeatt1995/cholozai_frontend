<template>
  <div class="dark:bg-slate-900">
    <div class="container mx-auto py-5 lg:py-8">
      <Nav />
    </div>
    <div>
      <div class="container mx-auto py-5 lg:py-8">
        <div class="grid gap-10 md:grid-cols-2 lg:gap-10">
          <BlogSinglePost v-for="(_, key) in 2" :key="key" />
        </div>
        <div class="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          <BlogSinglePost v-for="(_, key) in 12" :key="key + 'i'" />
        </div>
        <div class="mt-10 flex justify-center">
          <a
            class="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            href="/archive"
            ><span>View all Posts</span></a
          >
        </div>
      </div>
    </div>
    <div
      class="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-100 dark:border-gray-800"
    >
      <div class="text-center text-sm">
        Copyright © 2024 cholozai.com. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
