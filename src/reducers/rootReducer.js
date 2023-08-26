


/*
*  This is a reducer function. It takes two argumets. The state and an action.
*  That redurer funcntion is passed to the store and used to manupulate the state
*  though the actions.
*
*
*  We need to provide a default value to the reducer function, which will be used the first time that *  function runs. The default value is an Object.
*/

const initState = {
    data: null,
    isLoading: false,
};

const rootReducer = (state = initState, action) => {
    //console.log(action);
   // console.log(action);

    if(action.type === 'SEND_DATA') {
        return {
            ...state,
            data: action.value
        }
    }


    if(action.type === 'LOADING_STATE') {
        return {
            ...state,
            isLoading: action.value
        }
    }


    return state;
};



// Don't forget to export the rootReducer function. We will need to import it in the index.js file and pass it in the store function over there.
export default rootReducer;