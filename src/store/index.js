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
        return state.currentTourPromiseState.data;
      else return undefined;
    },
    getWeather(state) {
      return state.weather;
    },
  },

  mutations: {
    //synchronous
    addToFav(state, payload) {
     state.favourites.push(payload);
     console.log("this is my obj" + state.favourites);
    }
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
      //TODO set actual tour (this one is just for testing)
      resolvePromise(
        getHikeDetails(30987906),
        state.getters.getCurrentTourPromiseState
      );
    },
  },
  modules: {},
});
