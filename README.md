# Traili
Traili is an app to help hikers find the perfect trail and plan their tours in advance. They will have the opportunity to search for trails  and save their favourite ones. Additionally they will be provided with a weather forecast for the route they intend to hike.

Deployed page: https://lariwa.github.io/Traili/

We don't have a API-key yet, which works on the deployed page, refer to the video for our progress. Or run the project locally.

https://user-images.githubusercontent.com/40071882/162197998-8f61144d-888d-4e64-ae54-12aa6667377c.mp4



### What we have done so far
- vue set up
- connection to API
- routing
- SearchForm -> search and filter tours
- SearchResults -> present overview of seach results
- Detail View -> Show Details of Tour
### What we plan in the future
- connect to database
- authentification
- favourite tour view -> add and delete favourite tours
- responsive layout
- styling and focus on user experience
## File structure
- presenters/
    - SearchPresenter.vue: displays the seach form and the results, provides general search data and search results fetched from API
    - weatherPresenter.vue: send the API config data to the weather widget (regarded as view)
    - TrailDetailsPresenter.vue: add the trail to an array of favourite tours 
- views/
     - SearchFormView.vue: view for the search bar and filter options
     - SearchResultsView.vue: view for displaying the search results
     - TrailDetails.vue: view for displaying the details of the specific trail 
- components/
   - rangeSlider.vue: a range slider, which is used in SearchFormView
- router/
   - index.js: create the router object and configure the routes
- store/
    - index.js: vueX store for the data model
- assets/
    - some logo pictures
- main.js: mount app and use store, vuetify and router
- app.vue: mount the default webpage
- resolvePromise.js: resolves promises to avoid race condition
- hikeSource.js: API calls for searching, details and categories
- utilities.js: methods used accross different views

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
