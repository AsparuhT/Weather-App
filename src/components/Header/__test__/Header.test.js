import { render, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';



const mockStore = configureStore();


// Mock dispatch
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch
}));




describe('<Header />', () => {
    // Mock data/ store here
    let store;

    beforeEach(() => {
        // Set the store before any if the tests are executed
        store = mockStore({
            weatherData: { warning: null }
        });
    });


    // Check if the warning message displays
    it('displays warning message', () => {
        store = mockStore({
            weatherData: { warning: 'Test warning' }
        });
        const { getByText } = render(<Provider store={store}><Header /></Provider>);
        expect(getByText("Test warning")).toBeInTheDocument();
    });


    // Check if the input changes when keys are pressed
    it('handles input validation', () => {
        const { getByRole } = render(<Provider store={store}><Header /></Provider>);
        const input = getByRole('textbox');

        // Simulate user typing "Test"
        fireEvent.change(input, { target: { value: 'Test' } });
        // Check that the input's value has been updated
        expect(input.value).toBe('Test');
    });


    // Test the Enter key press and functionalities

    it('checks the Enter key press', () => {
        const { getByRole } = render(<Provider store={store}><Header /></Provider>);
        const input = getByRole('textbox');

        // First, simulate the user input
        fireEvent.change(input, { target: { value: 'Test' } });

        // Then simulate user pressing Enter
        fireEvent.keyDown(input, { key: 'Enter' });

        // Expect the mock dispatch to be called on Enter
        expect(mockDispatch).toHaveBeenCalled();
    });


}) // end of describe()


