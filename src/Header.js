import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Components
import LoadingSpinner from "./LoadingSpinner";
import SearchResults from "./SearchResults";
// Import Custom hooks
import useFetchResults from "./useFetchResults";
import useFocusOnLoad from "./useFocusOnLoad";
import useInputValidation from "./useInputValidation";
// Import actions
import { setWarning, setSearchResults } from "./redux_toolkit/weatherData"



const Header = () => {
    // Get the data and set the dispatcher
    const { warning } = useSelector(state => state.weatherData);
    const dispatch = useDispatch();

    // Get the custom hook functions
    const { fetchResultsByURL, fetchCityList, loadingSpinner } = useFetchResults();
    const { handleChange } = useInputValidation();

    // API credentails
    const owmApiKey = process.env.REACT_APP_OWM_API_KEY;
    const myApiToken = process.env.REACT_APP_MY_SEARCH_API_TOKEN;

    // States and Refs
    const [city, setCity] = useState('');
    const searchTimerRef = useRef(null);


    // Add focus on the user input on page load
    const inputRef = useFocusOnLoad();


    // Get the user input and perform checks to show or hide warnings
    // Also manage the timer reset
    function inputValidation(e) {
        handleChange(e, searchTimerRef);
        // Set the city
        setCity(e.target.value);
    }


    // Check the user input and starts the Search Timer if there are more then 2 characters
    function getSearchResults(e) {
        if (e.target.value.length >= 2) {
            // Clear the timer if keyUps is activated again
            if (searchTimerRef.current) {
                clearTimeout(searchTimerRef.current);
            }
            // Set the keyUp timer
            searchTimerRef.current = setTimeout(() => {
                fetchCityList(`https://city-list.atenev.com/autoComplete.php?q=${e.target.value}&mytoken=${myApiToken}`)
            }, 1000);
        }
    } // end of getSearchResults


    // Fetch results if <li> element is clicked on
    function fetchResults(cityID) {

        fetchResultsByURL(`http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${owmApiKey}&units=metric`);

        // Clear the input
        setCity('');
        // Clear the searchResults
        dispatch(setSearchResults(null));
        // Return the focus on the input
        inputRef.current.focus();
    } // end of fetchResults()


    // Add event listener for the <input> / Enter key. Make a fetch call
    function enterKeyEventListener(e) {
        if (e.key === 'Enter') {
            // Check if there is at least one character
            if (e.target.value < 2) {
                dispatch(setWarning('Enter at least 2 character'));
                return;
            }
            // Clear the timer
            clearTimeout(searchTimerRef.current);
            // Clear the search results
            dispatch(setSearchResults(null));

            fetchResultsByURL(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${owmApiKey}&units=metric`);

            // Clear the input
            setCity('');
        };// end of if 'Enter'
    } // end of enterKeyEventListener



    return (
        <header>
            <h1>Weather In</h1>
            {warning && <p className="warning-message">{warning}</p>}
            <input
                type="text"
                onKeyDown={enterKeyEventListener}
                onChange={inputValidation} // inputValidation
                onKeyUp={getSearchResults}
                value={city}
                ref={inputRef}
                maxLength="50"
            />
            {loadingSpinner && <LoadingSpinner />}
            <SearchResults fetchResults={fetchResults} />
        </header>
    );
}

export default Header;