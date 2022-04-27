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
    getFavourites(state) {
      return state.favourites;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
  },

  mutations: {
    //synchronous
    addToFav(state, payload) {
      if (!state.favourites.includes(payload)) state.favourites.push(payload);
      state.favourites.forEach(fav => console.log("add trail " + fav.id))
    }, 

    removeFromFav(state, payload){
      var found = state.favourites.find(element => element.id === payload.id);     
      state.favourites.splice(state.favourites.indexOf(found), 1);
      state.favourites.forEach(fav => console.log("remove trail "+ fav.id))
    },

    setCurrentTourID(state, id) {
      state.currentTourID = id;
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
