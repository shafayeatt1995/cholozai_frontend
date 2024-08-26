<template>
  <div class="inline-flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      data-slot="icon"
      class="w-4 h-4 mr-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      ></path>
    </svg>
    <select name="themeSwitch" v-model="selectedTheme">
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
      selectedTheme: "system",
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
      const savedTheme = localStorage.getItem("theme") || "system";
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
        // Auto-detect based on system preference
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
