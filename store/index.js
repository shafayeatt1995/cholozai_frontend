require("dotenv").config();
import axios from "axios";

export const state = () => ({
  apiUrl: process.env.API_URL,
  baseUrl: process.env.BASE_URL,
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
      const res = await axios.get(`${state.apiUrl}/fetch/navbar`);
      commit("setNavbarData", res.data);
    } catch (error) {
      console.error("Failed to fetch navbar data:", error);
    }
  },
};

export const getters = {
  baseUrl: (state) => state.baseUrl,
  apiUrl: (state) => state.apiUrl,
  districts: (state) => state.districts,
  divisions: (state) => state.divisions,
  pageTitle: () => "Cholozai Travel Guide",
  windowWidth: (state) => state.windowWidth,
  isDev: () => process.env.NODE_ENV === "development",
  isMobile: (state) => state.windowWidth < 992,
  isOnlyMobile: (state) => state.windowWidth < 641,
};
