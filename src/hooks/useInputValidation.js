import { useDispatch } from "react-redux";
import { setWarning, setSearchResults } from "../redux/weatherData";


// This hook deals with the input validation
// It sets warnings and reset the timer for the auto-complete functionality
const useInputValidation = () => {

    const dispatch = useDispatch();


    function handleChange(e, searchTimerRef) {
        let inputValue = e.target.value;

        // Clear the searchResults list and timer if the input is clear ot have less then 2 chars
        if (inputValue.length < 2) {
            dispatch(setSearchResults(null));
            if (searchTimerRef) {
                clearTimeout(searchTimerRef.current);
            }
        }

        // Clear the warnings if no chars in the input
        if (inputValue.length >= 0) {
            dispatch(setWarning(null));
        }

        // Check for comma and show a warning
        // This aims to discourage using formats like -London, UK
        if (inputValue.includes(',')) {
            dispatch(setWarning('Commas are not allowed.'));
        }

        // No more then 50 chars
        if (inputValue.length >= 50) {
            dispatch(setWarning('Maximum 50 characters are allowed.'));
        }

    }// end of handleChange


    return { handleChange }
}

export default useInputValidation;