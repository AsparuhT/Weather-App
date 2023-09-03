import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';


// Check if the App renders
it('renders without crashing', () => {
  render(<Provider store={store}><App /></Provider>);
});
