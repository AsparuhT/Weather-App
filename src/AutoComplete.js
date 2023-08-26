import { useState, useEffect} from 'react';


const AutoComplete = () => {

    const [cityList, setCityList] = useState('');


    // useEffect to asyncronislly load the JSON file once the page is loaded
    useEffect( () => {
        fetch('./api_locations/city-list.json')
        .then(res => res)
        .then(text => {
            console.log(text);
        })
        .catch(err => {
            console.log(err);
        });
    },[])//end of useEffect

    


    return ( 
        <div></div>
    );
}
 
export default AutoComplete;