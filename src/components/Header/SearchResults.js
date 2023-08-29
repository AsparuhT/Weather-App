import { useSelector } from "react-redux";



const SearchResults = ({ fetchResults }) => {
    // Get the search results and render display according to them
    const { searchResults } = useSelector(state => state.weatherData);

    if (!searchResults) return null;

    if (searchResults && searchResults.length > 0) {
        return (
            <ul className="search-results">
                {searchResults.map((result) => (
                    <li key={result.id} onClick={() => fetchResults(result.id)}>{`${result.name}, ${result.country}`}</li>
                ))}
            </ul>
        )
    }

    if (searchResults && searchResults.length === 0) {
        return (
            <ul className="search-results">
                <p className="no-matches">No matches found ...</p>
            </ul>
        )

    }

}

export default SearchResults;