import React, { createFactory } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/* ***
*
*     Redux configuration
*/

// import the createStore function from Redux
import { createStore } from 'redux';

// import the Provider component from React-Redux. The provider component wraps our app and we pass it the store as a parameter. That way, our app can communicate with the store and use it.
import { Provider } from 'react-redux';

// Import the reducer
import rootReducer from './reducers/rootReducer';


// This is the store function and it takes a reducer as a parameter
const store = createStore(rootReducer, /* Adding the Redux DevTools extension */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitalsnpm 
