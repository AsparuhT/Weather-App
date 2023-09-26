import { useSelector } from "react-redux";


// This component is part of the auto-compltete funnctionality of the app.
// It will render a loading spinnner animation.
const LoadingSpinner = () => {
    const { warning } = useSelector(state => state.weatherData);


    // Here we want to
    const spinnerStyle = {
      // if there is a warning, add different positioning values, so the loading spinner animation is always in the middle of the input field, u
        top: warning ? '80px' : '60px' 
      };

    return ( 
        <div className="loading-spinner"  style={spinnerStyle}></div>
     );
}
 
export default LoadingSpinner;