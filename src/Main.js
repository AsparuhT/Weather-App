import { useState, useEffect } from "react";
import { connect } from "react-redux";



const Main = ({data, isLoading}) => {


    // Capitalize the first letter of a word in a string
    function capitalizeWords(str) {
        return str.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
      }


    // States
    let [cityName, setCityName] = useState('City Name');
    let [cityCountry, setCityCountry] = useState('');
    let [degrees, setDegrees] = useState('0');
    let [minDegrees, setMinDegrees] = useState('0');
    let [maxDegrees, setMaxDegrees] = useState('0');
    let [cloudness, setCloudness] = useState('Cloudness');
    let[feelsLike, setFeelsLike] = useState('0');
    let[humidity, setHumidity] = useState('0');
    let[image, setImage] = useState('Clear');


    // useEffect to handle changes in the data props
    useEffect( () => {
        if(data && data.city) {
            setCityName(data.city.name);
            setCityCountry(data.city.country)

            setDegrees(Math.floor(data.list[0].main.temp));
            setMinDegrees(Math.floor(data.list[0].main.temp_min));
            setMaxDegrees(Math.ceil(data.list[0].main.temp_max));

            setCloudness(capitalizeWords(data.list[0].weather[0].description));

            setImage(data.list[0].weather[0].main);

            setFeelsLike(Math.floor(data.list[0].main.feels_like));

            setHumidity(data.list[0].main.humidity);
        }

       console.log(data);
    }, [data]); // Only re-run the effect if the `data` prop changes


    //console.log(data);

    return (
        <main>

            <h2>{isLoading ? 'Loading...' : `${cityName}, ${cityCountry}`  }</h2>
            <span>&#8226; &#8226; &#8226;</span>

            <div className="flex-right">
                <div className="degree-meter">
                    <p className="degree-meter__text">{ degrees }&#176;C</p>
                </div>
                <div className="cloudness-info flex-align-center">
                    <p className="cloudness-info__text">{ cloudness }</p>
                    <p className="cloudness-info__max">Max: { maxDegrees }&#176;C</p>
                    <p className="cloudness-info__min">Min: { minDegrees }&#176;C</p>
                </div>
            </div>

            <div className="weather-image"><img src={require(`./images/${ image }.webp`)} alt="" /></div>

            <div className="flex">
                <div className="feels-like">
                    <p className="feels-like__degrees">{ feelsLike }&#176;C</p>
                    <p className="feels-like__text">Feels Like</p>
                </div>
                <div className="humidity">
                    <p className="humidity__percentages">{ humidity }%</p>
                    <p className="humidity__text">Humidity</p>
                </div>
            </div>

        </main>

    );
}

// In order to get the state as from the store, we create the 'mapStateToProps' function. It
// takes the store state as a propery and returns an Object, with the props(data), we want from the  store
const mapStateToProps = (state) => {
    return {
        data: state.data,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(Main);