import { useSelector } from "react-redux";

const LoadingSpinner = () => {
    const { warning } = useSelector(state => state.weatherData);

    const spinnerStyle = {
        top: warning ? '80px' : '60px'
      };

    return ( 
        <div className="loading-spinner"  style={spinnerStyle}></div>
     );
}
 
export default LoadingSpinner;