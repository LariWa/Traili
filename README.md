# Traili
Traili is an app to help hikers find the perfect trail and plan their tours in advance. They will have the opportunity to search for trails  and save their favourite ones. Additionally they will be provided with a weather forecast for the route they intend to hike.

Deployed page: https://lariwa.github.io/Traili/


https://user-images.githubusercontent.com/40071882/167830437-dff3bb5d-0fee-4962-8159-ade9ed4ec80c.mp4


## File structure
- presenters/
    - ExplorePresenter.vue: presents the landing page with recommended hikes
    - FavouritePresenter.vue: presents the favourite trails of a logged in user
    - loginPresenter.vue: presents the login popup 
    - logoutPresenter.vue: presents the logout dropdown
    - navbarPresenter.vue: presents the navigation bar
    - pageNotFoundPresenter.vue: presents the page not found information if the route is not defined
    - SearchPresenter.vue: presents the search form and the results, provides general search data and search results fetched from API
    - SnackbarPresenter.vue: presents a snackbar which displays notifications (e.g. succesful login)
    - TrailDetailsPresenter.vue: presents the details about a trail 
    - TrailOverviewPresenter.vue: presents the overview of the given trails used for the search results, favourite trails and example trails on the start page
    - weatherPresenter.vue: send the API config data to the weather widget (regarded as view)
    
- views/
     - loginView.vue: view for the login popup
     - logOutView.vue: view for the logout dropdown
     - NavbarView.vue: view for the NavigationBar
     - NotFoundView.vue: view for informing the user that the page they try to reach can not be found
     - promiseNoData.vue: view for resolving a promise -> loading, no data and error displaying
     - SearchFormView.vue: view for the search bar and filter options
     - TrailDetailsView.vue: view for displaying the details of the specific trail 
     - TrailOverview.vue: view for displaying an overview of trails
     
- components/
    - Footer.vue: footer imgae
    - Header.vue: header image which is used for the landing page
    - rangeSlider.vue: a range slider which is used in SearchFormView
    - Snackbar.vue: displaying notifications in a snackbar
    - TrailOverviewCard.vue: card displaying trail informations, used for the overview
    
- router/
   - index.js: create the router object and configure the routes
- store/
    - index.js: vueX store for the data model
- assets/
    - some logo pictures
- main.js: mount app and use store, vuetify and router
- app.vue: mount the default webpage TODO as view, create presenter
- resolvePromise.js: resolves promises to avoid race condition
- hikeSource.js: API calls for searching, details and categories
- utilities.js: methods used accross different views
- firebaseConfig.js: firebase config details
- firebaseModel.js: maintain the data persistence between model and firebase.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### Config file
In order to run the app locally, you need to create a config file, which includes the API keys. Create a file APIConfig.js 
For the Outdooractive API you can use their [test key](https://developers.outdooractive.com/API-Reference/Data-API.html) The config file should look like this.
```
const project = <add Outdooractive Project name>;
const key = <add Outdooractive API key;
const gmapKey = <add google API Key>;
export { project, key, gmapKey };
```


