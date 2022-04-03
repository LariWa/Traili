import Vue from "vue";
import Vuex from "vuex";
import {
  getCategories as getCategoriesFetch,
  getHikeDetails,
} from "../hikeSource.js";
import { resolvePromise } from "../resolvePromise.js";
Vue.use(Vuex);

/*function updateFavourites(favourite){}*/

export default new Vuex.Store({
  state: {
    categoriesPromiseState: {},
    categories: [],
    currentTour: {},

    favourites: [], //array of objects
  },
  getters: {
    getCategories(state) {
      return state.categories;
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
  },

  mutations: {
    //synchronous
    setCategories(state, payload) {
      state.categories = payload.category;
    },
    setCurrentTour(state, payload) {
      console.log(payload);
      state.currentTour = payload.tour[0];
      },
    addToFav(state, payload) {
     state.favourites.push(payload);
    }
  },
  actions: {
    //asynchronous
    async setCategories(state) {
      resolvePromise(
        getCategoriesFetch(),
        state.getters.getCategoriesPromiseState,
        null
      );
      //TODO how to do that correctly?
      delay(1000).then(() =>
        state.commit(
          "setCategories",
          state.getters.getCategoriesPromiseState.data
        )
      );
    },
    async setCurrentTour(state) {
      //TODO set actual tour (this one is just for testing)
      getHikeDetails(30987906).then((res) =>
        state.commit("setCurrentTour", res)
      );
    },
  },
  modules: {},
});
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
