import Vue from "vue";
import Vuex from "vuex";
import { getCategories as getCategoriesFetch } from "../hikeSource.js";
import { updateFirebaseFromModel } from "../firebaseModel";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: [], //array of objects
    categories: [],
    currentTour: {},
    loggedIn: false,
    UID: "", //user account id from firebase
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getCurrentTour(state) {
      return state.currentTour;
    },
    getWeather(state) {
      return state.weather;
    },
    getUID(state) {
      return state.UID;
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
      state.favourites.push(payload);
    },
    removeFromFav(state, fav) {
      state.favourites.splice(state.favourites.indexOf(fav), 1);
    },
    setCurrentTour(state, tour) {
      state.currentTour = tour;
    },
    setLoggedIn(state, isLoggedIn) {
      state.loggedIn = isLoggedIn;
    },
    setUID(state, id) {
      state.UID = id;
    },
    setFav(state, fav) {
      state.favourites = fav;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    //asynchronous
    async setCategories({ commit }) {
      getCategoriesFetch().then((categories) =>
        commit("setCategories", categories)
      );
    },
    setCurrentTour({ commit }, currentTour) {
      commit("setCurrentTour", currentTour);
    },
    setFav({ commit }, fav) {
      commit("setFav", fav);
    },
    setUID({ commit }, id) {
      commit("setUID", id);
    },
    setLoggedIn({ commit }, isLoggedIn) {
      commit("setLoggedIn", isLoggedIn);
    },
    addToFav(state, payload) {
      if (!state.getters.getFavourites.includes(payload)) {
        console.log("add");
        state.commit("addToFav", payload);
      }
      updateFirebaseFromModel(state.favourites); //TODO remove
    },
    removeFromFav(state, payload) {
      var found = state.getters.getFavourites.find(
        (element) => element.id === payload.id
      );
      state.commit("removeFromFav", found);
      updateFirebaseFromModel(state.favourites); //TODO remove
    },
  },
  modules: {},
});
