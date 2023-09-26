import { useRef, useEffect } from "react"


// This hook adds focus on an element on load
const useFocusOnLoad = () => {
    // Set useRef reference
    const elementToFocus = useRef(null);

    useEffect(() => {
        // Check if elementToFocus and elementToFocus.current exist, and if they do, triggers the .focus() method on the referenced element
        if (elementToFocus && elementToFocus.current) {
            elementToFocus.current.focus();
        }
    }, []);


    return elementToFocus; // return elementToFocus so it can be binded to the element the functionn is called on
}

export default useFocusOnLoad;