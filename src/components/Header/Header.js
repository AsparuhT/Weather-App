import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Components
import LoadingSpinner from "./LoadingSpinner";
import SearchResults from "./SearchResults";
// Import Custom hooks
import useFetchResults from "../../hooks/useFetchResults";
import useFocusOnLoad from "../../hooks/useFocusOnLoad";
import useInputValidation from "../../hooks/useInputValidation";
// Import actions
import { setWarning, setSearchResults } from "../../redux/weatherData"



const Header = () => {
    // Get the data and set the dispatcher
    const { warning } = useSelector(state => state.weatherData);
    const dispatch = useDispatch();

    // Get the custom hook functions
    const { fetchResultsByURL, fetchCityList, loadingSpinner } = useFetchResults();
    const { handleChange } = useInputValidation();
    // 1. fetchResultsByURL and fetchCityList are fetch functions, as their names suggest
    // 2. loadingSpinner is a state with initial value of null. If its value changes to true that will render the LoadingSpinner component, which is the loading spinner animation for the auto-complete functionallity. It's values changes to true/null though the function - fetchCityList
    // 3. handleChange deals with the input validation, set warnings and reset the auto-compete timer

    // API credentails
    const owmApiKey = process.env.REACT_APP_OWM_API_KEY;
    const myApiToken = process.env.REACT_APP_MY_SEARCH_API_TOKEN;

    // States and Refs
    const [city, setCity] = useState('');
    const searchTimerRef = useRef(null); // ref to the auto-complete timer


    // Add focus on the user input on page load
    const inputRef = useFocusOnLoad();


    // Get the user input and perform checks to show or hide warnings
    // Also  reset the timer when needed. Set the city name
    function inputValidation(e) {
        handleChange(e, searchTimerRef); // imported from the useInputValidation() hook
        setCity(e.target.value);
    }


    // Check the input and starts the Search Timer if there are 2 or more characters
    function getSearchResults(e) {
        if (e.target.value.length >= 2) {
            // Clear the timer if keyUps is activated again
            if (searchTimerRef.current) {
                clearTimeout(searchTimerRef.current);
            }
            // Start the auto-complete timer
            // Will return array with top 6 matches or an empty array if nothing is found
            searchTimerRef.current = setTimeout(() => {
                fetchCityList(`https://city-list.atenev.com/autoComplete.php?q=${e.target.value}&mytoken=${myApiToken}`)
            }, 1000);
        }
    } // end of getSearchResults


    // Fetch results if an <li> element is clicked on
    function fetchResults(cityID) {

        fetchResultsByURL(`https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${owmApiKey}&units=metric`);

        // Clear the input and the search results llist
        setCity('');
        dispatch(setSearchResults(null));
        // Return the focus on the input
        inputRef.current.focus();
    } // end of fetchResults()


    // Add event listener for the <input> / Enter key. Make a fetch call
    // Will search for the location added in the input and display the weather data if such
    // Or will show an error that the 'City is not found'
    function enterKeyEventListener(e) {
        if (e.key === 'Enter') {
            // Check if there is at least one character
            if (e.target.value < 2) {
                dispatch(setWarning('Enter at least 2 character'));
                return;
            }

            fetchResultsByURL(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${owmApiKey}&units=metric`);

            // Clear the input and the search results list
            setCity('');
            dispatch(setSearchResults(null));
            // Clear the auto-complete timer
            clearTimeout(searchTimerRef.current);
        };// end of if 'Enter'
    } // end of enterKeyEventListener




    return (
        <header>
            <h1>Weather In</h1>
            {warning && <p className="warning-message">{warning}</p>}
            <input
                type="text"
                onKeyDown={enterKeyEventListener} // Listen for Enter key press
                onChange={(e) => {
                    inputValidation(e); // Triggers handleChange() and sets the city state
                    getSearchResults(e); // Triggers the auto-complete
                }}
                value={city}
                ref={inputRef}
                maxLength="50" // No more then 50 chars
            />
            {loadingSpinner && <LoadingSpinner />}
            <SearchResults fetchResults={fetchResults} />
        </header>
    );
}

export default Header;