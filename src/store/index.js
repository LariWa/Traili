import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
  },
  getters: {},
  mutations: {
    setCategories(state, categories) {
      console.log(categories);
      state.categories = categories;
    },
  },
  actions: {
    // call mutations here
  },
  modules: {},
});
