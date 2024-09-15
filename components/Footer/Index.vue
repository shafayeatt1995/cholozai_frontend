<template>
  <div class="py-4 lg:py-8">
    <hr />
    <div class="container mx-auto">
      <div
        class="flex pt-5 lg:pt-8 justify-between items-center gap-3 flex-col lg:flex-row"
      >
        <div class="w-full flex justify-between">
          <div class="flex items-center gap-3 justify-center lg:justify-start">
            <nuxt-link :to="{ name: 'terms-and-conditions' }"
              >Terms & condition</nuxt-link
            >
            <nuxt-link :to="{ name: 'privacy-policy' }"
              >Privacy policy</nuxt-link
            >
            <nuxt-link :to="{ name: 'contact' }">Contact us</nuxt-link>
          </div>
          <div class="lg:hidden">
            <DarkMode />
          </div>
        </div>
        <div class="text-center text-sm w-full">
          Copyright © 2024 cholozai.com. All rights reserved.
        </div>
        <div class="lg:justify-end w-full hidden lg:flex">
          <DarkMode />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
