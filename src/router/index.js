import Vue from 'vue'
import VueRouter from 'vue-router'
import searchForm from '../components/SearchFormView.vue'
import searchResults from '../components/SearchResultsView.vue'
import details from '../components/products/TrialDetails.vue'


Vue.use(VueRouter);

//configure router
export default new VueRouter({
    routes: [
        { path: '/SearchFormView', name: 'search', component: { searchForm, searchResults } },
        { path: '/TrialDetails', name: 'details', component: { details } },

    ]
});