require("dotenv").config();

export const state = () => ({
  apiUrl: process.env.API_URL,
  windowWidth: 0,
  districts: [],
  divisions: [],
});

export const mutations = {
  SET_WINDOW_WIDTH(state, payload) {
    state.windowWidth = payload;
  },
  setNavbarData(state, data) {
    const { districts, divisions } = data;
    state.districts = districts.sort((a, b) => a.name.localeCompare(b.name));
    state.divisions = divisions.sort((a, b) => a.name.localeCompare(b.name));
  },
};

export const actions = {
  windowWidth({ commit }) {
    commit("SET_WINDOW_WIDTH", window.innerWidth);
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch("fetchNavbarData");
  },
  async fetchNavbarData({ commit, state }) {
    try {
      const data = await this.$axios.$get(`${state.apiUrl}/fetch/navbar`);
      commit("setNavbarData", data);
    } catch (error) {
      console.error("Failed to fetch navbar data:", error);
    }
  },
};

export const getters = {
  apiUrl: (state) => state.apiUrl,
  districts: (state) => state.districts,
  divisions: (state) => state.divisions,
  pageTitle: () => process.env.APP_NAME || "CholoZai",
  windowWidth: (state) => state.windowWidth,
  isDev: () => process.env.NODE_ENV !== "production",
  isMobile: (state) => state.windowWidth < 992,
  isOnlyMobile: (state) => state.windowWidth < 641,
};
