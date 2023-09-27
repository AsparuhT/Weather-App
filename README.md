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

3. **Start the App**
   ````
   npm run start
   ````

## Usage

- **Search Weather:** Use the search bar to enter the location you want to check and hit the Enter key to view the corresponding weather data.
- **Auto-complete Suggestions:** As you start typing in the search bar, the app will suggest possible locations. The suggested options are clickable and will show the weather data for that location when clicked on.

## Key Components
The application has two key componnents. One to handle the user input and one to display the results. There are few suplemenotry componts too. The code of each component is very well commented. 

- **Header**: This component is where the search bar is. It handles the user input. Any actions or events in the app are triggered though it.
- **Main**: This component is where the weather data is displayed at.

# Testing 
