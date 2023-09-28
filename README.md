## The two files in this branch are the backend of the auto-complete functionality.

- **1. autoComplete.php** - This file receives the fetch call from the weather app, validates it and perform a database query based on the passed query string. It returns array with the found results or rerurns an empty array if no results are found.

- **2. cityList.sql** - That is the MySQL database that contsins a list with the location provided by the Open Weather Map API. 

## Setup

- If you want to use the weather app, with the auto-complete functinality provided by me, there is no need to go over this setup. It will work as long as you add the API keys in the .env file, as explained in the README.md in the main branch. If you want to configure it on your own database / API endpoint, then go ahead with the following instructions.

- **Import the database:** Import the .sql file in a MySQL database.
- **Connect the database to the autoComplete.php file:** Adjust the database credentials in that file so it connects to the database.
- **Add its 'my_token' API key:** If you don't have the API key, contact me so I can provide it to you.
- **Adjust the fetch url:** In the Header componend of the app you will find a function called 'getSearchResults' which holds the current API endpoint URL for the auto-complete functioality. Replace it with your own, while retaining the query string it has.
