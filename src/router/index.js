import Vue from 'vue'
import VueRouter from 'vue-router'
import searchForm from '../presenters/SearchFormPresenter.vue'
//import searchResultsView from '../components/SearchResultsView.vue'
import details from "../presenters/TrailDetailsPresenter.vue"

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

//configure router
export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/SearchFormView', name: 'search', component:searchForm},
        { path: '/TrialDetails', name: 'details', component: details},

    ]
});