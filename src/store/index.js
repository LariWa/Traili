import Vue from "vue";
import Vuex from "vuex";
import { getCategories as getCategoriesFetch } from "../hikeSource.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: [], //array of objects
    categories: [],
    currentTour: {},
    loggedIn: false,
    UID: "", //user account id from firebase
    userEmail: "",
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
    setUserEmail(state, email){
      state.userEmail = email;
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

    //clear user data after sign out
    clearData({ commit }) {
      commit("setUID", "");
      commit("setFav", []);
      commit("setLoggedIn", false);
    },

    addToFav(state, id) {
      if (!state.getters.getFavourites.includes(parseInt(id))) {
        state.commit("addToFav", parseInt(id));
      }
      // updateFirebaseFromModel(state.favourites); //TODO remove
    },
    removeFromFav(state, id) {
      if (state.getters.getFavourites.includes(parseInt(id)))
        state.commit("removeFromFav", parseInt(id));
      //updateFirebaseFromModel(state.favourites); //TODO remove
    },
  },
  modules: {},
});
