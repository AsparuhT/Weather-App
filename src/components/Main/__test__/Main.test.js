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
        store = mockStore({ // Initiate a moch store
            weatherData: {
                data: {
                    city: {
                        name: "Test City",
                        country: "TC"
                    },
                    list: [
                        {
                            main: {
                                temp: 25,
                                temp_min: 22,
                                temp_max: 28,
                                feels_like: 24,
                                humidity: 60
                            },
                            weather: [
                                {
                                    description: "clear sky",
                                    main: "Clear"
                                }
                            ]
                        }
                    ],
                },
                isLoading: false
            }
        });
    });// end of store



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
        expect(getByText('24°C')).toBeInTheDocument(); // feels like
        expect(getByText('60%')).toBeInTheDocument(); // humidity
    })
}) // end of describe()


