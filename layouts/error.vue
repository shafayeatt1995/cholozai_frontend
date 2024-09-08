<template>
  <Error />
</template>

<script>
export default {
  name: "NotFound",
  async mounted() {
    initLottie(this.$refs.error, "/lottie/404.json");
  },
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>
