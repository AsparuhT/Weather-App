import { useSelector } from "react-redux";


// This component is part of the auto-compltete funnctionality of the app.
// It will render a list of items based on the user search input, allowing the user to interact with the results if such are found. The user can click on one of the suggested results and get the weather data for that location.
const SearchResults = ({ fetchResults }) => {
    // Get the search results and render display according to them
    const { searchResults } = useSelector(state => state.weatherData);


    // If searchResults is (null) nothing gets rendered to the page
    // This is the default state of searchResults
    if (!searchResults) return null;


    
    // If there are matches found, then we render a list (<ul>) of items (<li>) based on the searchResults array. Each list item is clickable, and clicking on it will invoke the fetchResults function with the id of the clicked result as its argument.
    if (searchResults && searchResults.length > 0) {
        return (
            <ul className="search-results">
                {searchResults.map((result) => (
                    <li key={result.id} onClick={() => fetchResults(result.id)}>{`${result.name}, ${result.country}`}</li>
                ))}
            </ul>
        )
    }


    // If the API call to the city-list does not find matches and retun an empty array,
    // then render a list with just a (<p>) element indicating that no matches were found.
    if (searchResults && searchResults.length === 0) {
        return (
            <ul className="search-results">
                <p className="no-matches">No matches found ...</p>
            </ul>
        )

    }

}

export default SearchResults;