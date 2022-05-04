import Vue from "vue";
import VueRouter from "vue-router";
import explore from "../presenters/ExplorePresenter.vue";
import search from "../presenters/SearchPresenter.vue";
import details from "../presenters/TrailDetailsPresenter.vue";
import favourites from "../presenters/FavouritePresenter.vue";
import login from "../presenters/loginPresenter.vue";
const originalReplace = VueRouter.prototype.replace;

VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

//configure router
export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/Explore", name: "explore", component: explore },
    { path: "/Search", name: "search", component: search },
    { path: "/TrialDetails", name: "details", component: details },
    { path: "/Favourites", name: "favourites", component: favourites },
    { path: "/Login", name: "login", component: login },
  ],
});
