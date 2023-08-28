import { useState, useEffect, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
// Import actions
import { sendData, isLoading, loadingState } from "./redux_toolkit/weatherData"



const Header = () => {
    //configure the dispatcher, using the useDispatch hook
    // when we call it we will pass the actions we have set for that reducer / slice
    let { isLoading } = useSelector(state => state.weatherData);
    const dispatch = useDispatch();

    // API credentails
    const owm_api_key = process.env.REACT_APP_OWM_API_KEY;
    const my_search_api_token = process.env.REACT_APP_MY_SEARCH_API_TOKEN;



    // States
    const [city, setCity] = useState('');
    const [warning, setWarning] = useState(null);
    const [loadingSpinner, setLoadingSpinner] = useState(null);



    // Get the user input and perform checks to show or hide warnings
    // Also manage the timer reset
    function handleChange(e) {
        let inputValue = e.target.value;

        // Clear the searchResults and timer if input is clear
        if(inputValue.length < 2) {
            setSearchResults(null);
            clearTimeout(searchTimerRef.current);
        }

        // Clear the warning
        if(inputValue.length >= 0) {
            setWarning(null);
        }

        // Check for comma and show a warning
        if(inputValue.includes(',')) {
            setWarning('Commas are not allowed.');
        }

        if(inputValue.length > 50) {
            setWarning('Maximum 50 characters are allowed.');
        }

        // Set the city
        setCity(inputValue);
    } // end of handleChange



    // Check if 2 seconds have passed since the last letter
    // and then, run fetch based on the reustls
    // Minimum of 2 characters shoulld be added
    const [searchResults, setSearchResults] = useState(null);
    const searchTimerRef = useRef(null);


    // Check the user input and starts the Search Timer its there are more then 2 characters
    function getSearchResults(e) {
        if (e.target.value.length >= 2) {
            //console.log(e.target.value);

            // Clear the timer if keyUps is activated again
            if (searchTimerRef.current) {
                clearTimeout(searchTimerRef.current);
            }

            // Set the keyUp timer
            searchTimerRef.current = setTimeout(() => {
                setLoadingSpinner(true);

                fetch(`https://city-list.atenev.com/autoComplete.php?q=${e.target.value}&mytoken=${my_search_api_token}`)
                    .then(res => {
                        if (!res.ok) {
                            setLoadingSpinner(true);
                            throw new Error('Autoloading request failed...')
                        }
                        return res.json();
                    })
                    .then(searchResult => {
                        setLoadingSpinner(null);
                        setSearchResults(searchResult);
                    })
                    .catch(err => {
                        setLoadingSpinner(null);
                      //  setWarning(err.message);
                        console.log(err);
                    })
            }, 1500);
        }
    } // end of getSearchResults




    // Fetch results if <li> element is clicked on
    function fetchResults(cityID) {
        // Set Loading...
        dispatch(loadingState(true));

        fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${owm_api_key}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json()
            })
            .then((data) => {
                //Clear Loading...
                dispatch(loadingState(false));
                //setData(data);
                dispatch(sendData(data));
                // Clear the warning
                setWarning(null);
            })
            .catch(err => {
                //Clear Loading...
                dispatch(loadingState(false));
                setWarning(err.message);
            }) // end of fetch.then.then.catch
        // Clear the input
        setCity('');
        // Clear the searchResults
        setSearchResults(null);
        //reutn the focus on the input
        inputRef.current.focus();


    } // end of fetchResults()




    // Add focus on the user input on page load
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef) {
            inputRef.current.focus();
        }
    }, []);


    // Add event listener for the <input> / Enter key. Make the fetch call
    function enterKeyEventListener(e) {
        if (e.key === 'Enter') {
            // Set Loading...
            dispatch(loadingState(true));
            // Clear the timer
            clearTimeout(searchTimerRef.current);
            // Clear the search results
            setSearchResults(null);


            // Get the data for the selected City - normal fetch
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${owm_api_key}&units=metric`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('City not found');
                    }
                    return response.json()
                })
                .then((data) => {
                    //Clear Loading...
                    dispatch(loadingState(false));
                    //setData(data);
                    dispatch(sendData(data));
                    // Clear the warning
                    setWarning(null);

                })
                .catch(err => {
                    //Clear Loading...
                    dispatch(loadingState(false));
                    setWarning(err.message);
                }) // end of fetch.then.then.catch
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
                onChange={handleChange} // inputValidation
                onKeyUp={getSearchResults} 
                value={city}
                ref={inputRef}
            />
            {loadingSpinner && <LoadingSpinner />}

            


            {searchResults && searchResults.length > 0 && (
                <ul className="search-results">
                    {searchResults.map((result) => (
                        <li key={result.id} onClick={() => fetchResults(result.id)}>{`${result.name}, ${result.country}`}</li>
                    ))}
                </ul>
            )}

            {searchResults && searchResults.length === 0 && (
                <ul className="search-results">
                    <p className="no-matches">No matches found ...</p>
                </ul>
            )}

        </header>
    );
}

export default Header;