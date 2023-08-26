
import { useState } from "react";

import Header from "./Header";
import Main from "./Main";

import TestComponent from "./TestComponent";


function App() {

  // Set the state here so it can be lifted up and stored as data
  //const [data, setData] = useState(null);

  // Pass the Loading state
  //let [isLoading, setIsLoading] = useState(false);

  //console.log(data);

  return (
    <div className="App">
      <div className="container">

        <Header />

        <Main />

      </div>


    </div>// end of App
  );
}

export default App;
