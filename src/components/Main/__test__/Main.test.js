import { getByText, render, screen } from '@testing-library/react';
import Main from '../Main';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();


// Test if the states are properly updating the weather display
// 1. Create redux-mock-store for the test data
// 2. Group the tests and see if the elements display the passed data


describe('<Main />', () => {
    // Mock data / store here
    let store;

    beforeEach(() => {
        // Set the store before any if the tests are executed
        store = mockStore({
            weatherData: {
                data: {
                    city: {
                        name: "Test City",
                        country: "TC"
                    },
                    list: [
                        {
                            main: { // 0th Element
                                temp: 25,
                                temp_min: 22,
                                temp_max: 28,
                                feels_like: 23,
                                humidity: 60
                            },
                            weather: [{ description: "clear sky", main: "Clear" }]
                        },
                        {}, // 1st Element Placeholder
                        {
                            main: { // 2nd Element // 6h
                                temp: 6,
                                temp_min: 24,
                                temp_max: 30,
                                feels_like: 26,
                                humidity: 70
                            },
                            weather: [{ description: "light rain", main: "Rain" }]
                        },
                        {}, // 3rd Element Placeholder
                        {
                            main: { // 4th Element // 12h
                                temp: 12,
                                temp_min: 26,
                                temp_max: 32,
                                feels_like: 28,
                                humidity: 80
                            },
                            weather: [{ description: "heavy rain", main: "Rain" }]
                        },
                        {}, // 5th Element Placeholder
                        {}, // 6th Element Placeholder
                        {}, // 7th Element Placeholder
                        {
                            main: { // 8th Element // 24h
                                temp: 24,
                                temp_min: 27,
                                temp_max: 33,
                                feels_like: 29,
                                humidity: 85
                            },
                            weather: [{ description: "snow", main: "Snow" }]
                        },
                    ],
                },
                isLoading: false
            }
        }); // end of store
    }); // end of  beforeEach()



    it('check if the weather data renders correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Main />
            </Provider>
        );

        // Your test assertions here
        expect(getByText('Test City, TC')).toBeInTheDocument();
        expect(getByText('25°C')).toBeInTheDocument();
        expect(getByText('Clear Sky')).toBeInTheDocument();
        expect(getByText('Max: 28°C')).toBeInTheDocument();
        expect(getByText('Min: 22°C')).toBeInTheDocument();
        expect(getByText('23°C')).toBeInTheDocument(); // feels like
        expect(getByText('60%')).toBeInTheDocument(); // humidity
        // forecast
        expect(getByText('6°C')).toBeInTheDocument(); //6h
        expect(getByText('12°C')).toBeInTheDocument(); //12h
        expect(getByText('24°C')).toBeInTheDocument(); //24h
    });
}); // end of describe()