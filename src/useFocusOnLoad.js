import { useRef, useEffect } from "react"


const useFocusOnLoad = () => {
    // Set useRef reference
    const elementToFocus = useRef(null);

    useEffect(() => {
        if (elementToFocus && elementToFocus.current) {
            elementToFocus.current.focus();
        }
    }, []);


    return elementToFocus;
}

export default useFocusOnLoad;