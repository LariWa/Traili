import Vue from "vue";
import Vuex from "vuex";
import { getCategories as getCategoriesFetch } from "../hikeSource.js";
import { resolvePromise } from "../resolvePromise.js";
import { updateFirebaseFromModel } from "../firebaseModel";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: [], //array of objects
    categoriesPromiseState: { data: [] },
    currentTour: {},
    loggedIn: false,
    UID: "", //user account id from firebase
    userEmail: "",
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
    //TODO call mutations from actions
    //synchronous
    addToFav(state, payload) {
      if (!state.favourites.includes(payload)) state.favourites.push(payload);
      state.favourites.forEach((fav) => console.log("add trail " + fav.id));
      updateFirebaseFromModel(state.favourites);
    },

    removeFromFav(state, payload) {
      var found = state.favourites.find((element) => element.id === payload.id);
      state.favourites.splice(state.favourites.indexOf(found), 1);
      state.favourites.forEach((fav) => console.log("remove trail " + fav.id));
      updateFirebaseFromModel(state.favourites);
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
    async setCurrentTour(context, currentTour) {
      context.commit("setCurrentTour", currentTour);
    },
  },
  modules: {},
});
