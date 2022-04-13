import Vue from "vue";
import Vuex from "vuex";
import { getCategories as getCategoriesFetch } from "../hikeSource.js";
import { resolvePromise } from "../resolvePromise.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: [], //array of objects
    categoriesPromiseState: { data: [] },
    currentTour: {},
    loggedIn: false,
  },
  getters: {
    getCategories(state) {
      if (state.categoriesPromiseState.data)
        return state.categoriesPromiseState.data;
      else return [];
    },
    getCategoriesPromiseState(state) {
      return state.categoriesPromiseState;
    },

    getCurrentTour(state) {
      return state.currentTour;
    },
    getWeather(state) {
      return state.weather;
    },

    getFavourites(state) {
      return state.favourites;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
  },

  mutations: {
    //synchronous
    //TODO call mutations from actions
    addToFav(state, payload) {
      if (!state.favourites.includes(payload)) state.favourites.push(payload);
      state.favourites.push(payload);
      state.favourites.forEach((fav) => console.log("add trail " + fav.id));
    },

    removeFromFav(state, payload) {
      var found = state.favourites.find((element) => element.id === payload.id);
      state.favourites.splice(state.favourites.indexOf(found), 1);
      state.favourites.forEach((fav) => console.log("remove trail " + fav.id));
    },

    setCurrentTour(state, tour) {
      state.currentTour = tour;
    },
    setLoggedIn(state, isLoggedIn) {
      state.loggedIn = isLoggedIn;
    },
  },
  actions: {
    //asynchronous
    async setCategories(state) {
      resolvePromise(
        getCategoriesFetch(),
        state.getters.getCategoriesPromiseState
      );
    },
    async setCurrentTour(context, currentTour) {
      context.commit("setCurrentTour", currentTour);
    },
  },
  modules: {},
});
