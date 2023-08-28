import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendData, loadingState, setWarning, setSearchResults } from "./redux_toolkit/weatherData";

const useFetchResults = () => {
    const dispatch = useDispatch();

    // States
    const [loadingSpinner, setLoadingSpinner] = useState(null);



    // Fetch results based on the URL ( CityID or CityName)
    function fetchResultsByURL(url) {
        // Set Loading...
        dispatch(loadingState(true));

        // fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${owm_api_key}&units=metric`)
        fetch(url)
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
                dispatch(setWarning(null));
            })
            .catch(err => {
                //Clear Loading...
                dispatch(loadingState(false));
                dispatch(setWarning(err.message));
            }) // end of fetch.then.then.catch
    } // end of fetchResultsByCityID



    function fetchCityList(url) {

        setLoadingSpinner(true);

                fetch(url)
                    .then(res => {
                        if (!res.ok) {
                            //setLoadingSpinner(true);
                            throw new Error('Autoloading request failed...')
                        }
                        return res.json();
                    })
                    .then(searchResult => {
                        setLoadingSpinner(false);
                        dispatch(setSearchResults(searchResult));
                    })
                    .catch(err => {
                        setLoadingSpinner(null);
                        console.log(err);
                    })

    }


    return { fetchResultsByURL, fetchCityList, loadingSpinner }
}

export default useFetchResults;