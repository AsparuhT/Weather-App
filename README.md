# Weather App

This project is a dynamic Weather Application developed using React, Redux, and integrated with the OpenWeather API. It aims to provide accurate and real-time weather data based on user input, offering an intuitive and responsive user interface.

## Table of Contents

- [Features](#features)
- [Installation / Setup](#installation--setup)
- [Usage](#usage)
- [Key Components](#key-components)
- [Testing](#testing)

## Features

- **React and Redux**: Developed using React for UI components and Redux for state management.
- **OpenWeather API Integration**: Retrieves real-time weather data based on user input.
- **Intuitive UI**: Includes a search bar, weather display, and visual representations of weather conditions.
- **Auto-complete Feature**: Enhances user experience by suggesting possible locations while typing.
- **Responsive Design**: Mobile friendly and responsive.
- **Error Handling**: Manages error cases such as invalid locations or API failures with appropriate error messages.

## Installation / Setup

1. **Clone the Repository**
   ````
   git clone https://github.com/AsparuhT/Weather-App.git
   ````

2. **Install Dependencies**
   ````
   cd Weather-App
   npm install
   ````
   
3. **Add the API keys in the .env file as Global variables**
   ````
   # Open Weather Map API key
   REACT_APP_OWM_API_KEY="add your Open Weather API key here"
   # API key for the auto-complete
   REACT_APP_MY_SEARCH_API_TOKEN="if you don't have this key contact me and I will provde it to you"
   ````

4. **Start the App**
   ````
   npm run start
   ````

- **In the branch called auto-complete, you will find the auto-complete file and the city-list database. There are instuctions on setting up the auto-complete API endpoint with your own database  if you want to do so.** 

## Usage

- **Search Weather:** Use the search bar to enter the location you want to check and hit the Enter key to view the corresponding weather data.
- **Auto-complete Suggestions:** As you start typing in the search bar, the app will suggest possible locations. The suggested options are clickable and will show the weather data for that location when clicked on.

## Key Components
The application has two key components. One to handle the user input and one to display the results. There are a few supplementary components too. The code of each component is very well commented.

- **Header**: This component is where the search bar is. It handles the user input. Any action or event in the app are triggered though it. The data flow within the Header component follows this sequence:

1. **User Input:**
   The user begins by typing a location into the search bar.

2. **Enter Key Press:**
   - If the user presses the Enter key, a fetch request is triggered to the Open Weather API.
   - If the input is valid, the fetched results are passed to and rendered in the Main component.
   - If the input is invalid, no data is rendered in the Main component, and a warning message is displayed to the user.

3. **Auto-complete:**
   - If the user doesn’t press Enter, after one second of inactivity, the auto-complete feature triggers a fetch request.
   - The fetched list of suggested locations is displayed, allowing the user to select one. If no matches are found, a 'No matches' notice is displayed.

4. **Location Selection from Suggestions:**
   - If a user clicks on a suggested location, another fetch request is made to the Open Weather API, and the results are displayed in the Main component.

- **Main**: This component is where the weather data is displayed at. By default there is no data there and will populate only when there is a successful API call to the Open Weather API.

# Testing 

This project utilizes [Jest](https://jestjs.io/) as the testing framework and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for writing unit and integration tests.

To run the tests, use the following command:
````
npm run test
````
It has 3 test suites, incorporating a series of tests primarily focusing on the rendering ability of components. Mock data is passed to the components and the aim is to validate whether the components are rendering correctly and the expected output is being displayed.

````
 PASS  src/App.test.js
 PASS  src/components/Main/__test__/Main.test.js
 PASS  src/components/Header/__test__/Header.test.js
````
