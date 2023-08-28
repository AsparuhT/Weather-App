import { useState } from "react";
import { useDispatch } from "react-redux";
import { setWarning, setSearchResults } from "./redux_toolkit/weatherData";

const useInputValidation = () => {

    const dispatch = useDispatch();


    function handleChange(e, searchTimerRef) {
        let inputValue = e.target.value;

        // Clear the searchResults and timer if input is clear
        if (inputValue.length < 2) {
            dispatch(setSearchResults(null));
            if (searchTimerRef) {
                clearTimeout(searchTimerRef.current);
            }
        }

        // Clear the warning
        if (inputValue.length >= 0) {
            dispatch(setWarning(null));
        }

        // Check for comma and show a warning
        if (inputValue.includes(',')) {
            dispatch(setWarning('Commas are not allowed.'));
        }

        if (inputValue.length >= 50) {
            dispatch(setWarning('Maximum 50 characters are allowed.'));
        }

    }// end of handleChange


    return { handleChange }
}

export default useInputValidation;