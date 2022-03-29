// a presenter of search form (weather part)
// will merge with the search route/city later
// resolve the weather and process the data so that it fits the input of weatherView
// not sure if the process part belongs to presenter or model???
//not working yet!
import { searchWeather } from "../resolveWeather.js";

const Search = {   // ordinary JS object literal, can have methods
    //props: ["model"],
    data() {
        //will be added when you work with component state 
        //return { state: { promiseState: {}, params: {} } };

    },
    created() {
        //lifecycle: move the first search initialization here! 
        const component = this;

    },
    render() {
        const component = this;
        /* re-use the functional component code, but replace props with component! */
        return (
            <div>
                <SearchFormView
                    dishTypeOptions={["starter", "main course", "dessert"]}
                    onTextChange={function searchTextACB(text) {
                        component.state.params.query = text;
                    }}
                    onDropDownChange={function searchTypeCB(type) {
                        component.state.params.type = type;
                    }}
                    onSearch={function searchNowACB() {
                        searchWeather(location);//location is a component state parameter of {lon,lat}
                        processWeather(dateJump);//dateJump is a component state parameter, integer, how many days after today
                    }}
                />
                {promiseNoData(component.state.promiseState) || (
                    <SearchResultsView
                        searchResults={component.state.promiseState.data}
                        onChooseResult={function resultChosenACB(searchResult) {
                            component.model.setCurrentDish(searchResult.id);
                        }}
                    />
                )}
            </div>
        );

    },
};


export default Search;