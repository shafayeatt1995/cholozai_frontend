<template>
  <div class="inline-flex items-end gap-2">
    <i
      class="fa-regular fa-moon dark:text-white"
      v-if="selectedTheme === 'dark'"
    ></i>
    <i class="fa-regular fa-sun" v-else-if="selectedTheme === 'light'"></i>
    <label for="darkMode"> </label>
    <select
      id="darkMode"
      class="rounded-md dark:bg-gray-900 dark:text-white"
      v-model="selectedTheme"
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "DarkMode",
  data() {
    return {
      selectedTheme: "light",
    };
  },
  watch: {
    selectedTheme() {
      this.changeTheme();
    },
  },
  mounted() {
    this.setInitialTheme();
  },
  methods: {
    setInitialTheme() {
      const savedTheme = localStorage.getItem("theme") || "light";
      this.selectedTheme = savedTheme;
      this.applyTheme(savedTheme);
    },
    changeTheme() {
      this.applyTheme(this.selectedTheme);
      localStorage.setItem("theme", this.selectedTheme);
    },
    applyTheme(theme) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
      } else if (theme === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (prefersDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
  },
};
</script>
