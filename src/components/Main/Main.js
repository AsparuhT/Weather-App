import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { capitalizeWords } from "../../utils/capitalizeWords";



const Main = () => {
    // Get the data from the store
    const { data } = useSelector(state => state.weatherData);
    let { isLoading } = useSelector(state => state.weatherData);

    // States
    let [cityName, setCityName] = useState('City Name');
    let [cityCountry, setCityCountry] = useState('Country Code');
    let [degrees, setDegrees] = useState('0');
    let [minDegrees, setMinDegrees] = useState('0');
    let [maxDegrees, setMaxDegrees] = useState('0');
    let [cloudness, setCloudness] = useState('Cloudness');
    let [feelsLike, setFeelsLike] = useState('0');
    let [humidity, setHumidity] = useState('0');
    let [image, setImage] = useState('Clear');
    // Add forecast
    let [f6hDegrees, setF6hDegrees] = useState('0');
    let [f12hDegrees, setF12hDegrees] = useState('0');
    let [f24hDegrees, setF24hDegrees] = useState('0');
    let [f6hImage, setF6hImage] = useState('Clear');
    let [f12hImage, setF12hImage] = useState('Clear');
    let [f24hImage, setF24hImage] = useState('Clear');



    // useEffect to handle changes in the data state
    useEffect(() => {
        if (data && data.city) {
            setCityName(data.city.name);
            setCityCountry(data.city.country)

            setDegrees(Math.floor(data.list[0].main.temp));
            setMinDegrees(Math.floor(data.list[0].main.temp_min));
            setMaxDegrees(Math.ceil(data.list[0].main.temp_max));

            setCloudness(capitalizeWords(data.list[0].weather[0].description));

            setImage(data.list[0].weather[0].main);

            setFeelsLike(Math.floor(data.list[0].main.feels_like));

            setHumidity(data.list[0].main.humidity);
            // Add forecast
            setF6hDegrees(Math.floor(data.list[2].main.temp)); //6h
            setF6hImage(data.list[2].weather[0].main);//6h

            setF12hDegrees(Math.floor(data.list[4].main.temp)); //12h
            setF12hImage(data.list[4].weather[0].main);//12h

            setF24hDegrees(Math.floor(data.list[8].main.temp)); //24h
            setF24hImage(data.list[8].weather[0].main);//24h


        }

        console.log(data)
    }, [data]); // Only re-run the effect if the `data` state changes



    return (
        <main>

            <h2>{isLoading ? 'Loading...' : `${cityName}, ${cityCountry}`}</h2>
            <span>&#8226; &#8226; &#8226;</span>

            <div className="flex-right">
                <div className="degree-meter">
                    <p className="degree-meter__text">{degrees}&#176;C</p>
                </div>
                <div className="cloudness-info flex-align-center">
                    <p className="cloudness-info__text">{cloudness}</p>
                    <p className="cloudness-info__max">Max: {maxDegrees}&#176;C</p>
                    <p className="cloudness-info__min">Min: {minDegrees}&#176;C</p>
                </div>
            </div>

            <div className="weather-image"><img src={require(`../../assets/images/${image}.webp`)} alt="weather-image" /></div>

            <div className="flex">
                <div className="feels-like">
                    <p className="feels-like__degrees">{feelsLike}&#176;C</p>
                    <p className="feels-like__text">Feels Like</p>
                </div>
                <div className="humidity">
                    <p className="humidity__percentages">{humidity}%</p>
                    <p className="humidity__text">Humidity</p>
                </div>
            </div>

            <div className="forecast">
                <div className="hourly_forecast">
                    <p>in 6h</p>
                    <div className="forecast-image"><img src={require(`../../assets/images/${f6hImage}.webp`)} alt="weather image" /></div>
                    <p>{f6hDegrees}&#176;C</p>
                </div>
                <div className="hourly_forecast">
                    <p>in 12h</p>
                    <div className="forecast-image"><img src={require(`../../assets/images/${f12hImage}.webp`)} alt="weather image" /></div>
                    <p>{f12hDegrees}&#176;C</p>
                </div>
                <div className="hourly_forecast">
                    <p>in 24h</p>
                    <div className="forecast-image"><img src={require(`../../assets/images/${f24hImage}.webp`)} alt="weather image" /></div>
                    <p>{f24hDegrees}&#176;C</p>
                </div>
            </div>

        </main>
    );
}


export default Main;