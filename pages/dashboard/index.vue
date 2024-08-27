<template>
  <div v-if="show">load</div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.login();
  },
  methods: {
    login() {
      let password = prompt("Please enter your password");
      this.show = password === "anik1234";
    },
  },
};
</script>
