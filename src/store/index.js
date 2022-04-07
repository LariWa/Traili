import Vue from "vue";
import Vuex from "vuex";
import {
  getCategories as getCategoriesFetch,
  getHikeDetails,
} from "../hikeSource.js";
import { resolvePromise } from "../resolvePromise.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: [], //array of objects
    currentTourID: "",
    categoriesPromiseState: { data: [] },
    currentTourPromiseState: { data: [] },
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
    getCurrentTourPromiseState(state) {
      return state.currentTourPromiseState;
    },
    getCurrentTour(state) {
      if (state.currentTourPromiseState.data)
        return state.currentTourPromiseState.data[0];
      else return undefined;
    },
    getWeather(state) {
      return state.weather;
    },
    getCurrentTourID(state) {
      return state.currentTourID;
    },
  },

  mutations: {
    //synchronous
    addToFav(state, payload) {
      state.favourites.push(payload);
      // console.log("this is my obj" + state.favourites);
    },
    setCurrentTourID(state, id) {
      state.currentTourID = id;
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
    async setCurrentTour(state) {
      if (state.getters.getCurrentTourID)
        resolvePromise(
          getHikeDetails(state.getters.getCurrentTourID),
          state.getters.getCurrentTourPromiseState
        );
    },
  },
  modules: {},
});
