import Vue from "vue";
import VueRouter from "vue-router";
import search from "../presenters/SearchPresenter.vue";
//import searchResultsView from '../components/SearchResultsView.vue'
import details from "../presenters/TrailDetailsPresenter.vue";
import favourites from "../presenters/FavouritePresenter.vue";
const originalReplace = VueRouter.prototype.replace;

VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

//configure router
export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/Search", name: "search", component: search },
    { path: "/TrialDetails", name: "details", component: details },
    { path: "/Favourites", name: "favourites", component: favourites },
  ],
});
