import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: [], //array of objects
    currentTour: {},
    loggedIn: false,
    UID: "", //user account id from firebase
    userEmail: "",
    snackbarValue: false,
    snackbarText: "",
    showLogInPopUp: false,
  },
  getters: {
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
    getEmail(state) {
      return state.userEmail;
    },
    getSnackbarValue(state) {
      return state.snackbarValue;
    },
    getSnackbarText(state) {
      return state.snackbarText;
    },
    getShowLogInPopUp(state) {
      return state.showLogInPopUp;
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
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setSnackbarValue(state, value) {
      state.snackbarValue = value;
    },
    setSnackbarText(state, text) {
      state.snackbarText = text;
    },
    setShowLogInPopUp(state, text) {
      state.showLogInPopUp = text;
    },
  },
  actions: {
    //asynchronous

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
      commit("setSnackbarValue", true);
      commit("setSnackbarText", "You are logged out!");
    },

    // initialize lcoal user data after log in
    initData({ commit }, user) {
      commit("setUID", user.uid);
      commit("setLoggedIn", true);
      commit("setUserEmail", user.email);
      commit("setSnackbarValue", true);
      commit("setSnackbarText", "You are logged in!");
      commit("setShowLogInPopUp", false);
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
    setUserEmail({ commit }, email) {
      commit("setUserEmail", email);
    },
    setSnackbar({ commit }, text) {
      commit("setSnackbarValue", true);
      commit("setSnackbarText", text);
    },
    setSnackbarValue({ commit }, value) {
      commit("setSnackbarValue", value);
    },
    setShowLogInPopUp({ commit }, value) {
      commit("setShowLogInPopUp", value);
    },
  },
  modules: {},
});
