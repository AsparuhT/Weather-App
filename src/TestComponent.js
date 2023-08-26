// import { connect } from "react-redux";


// const TestComponent = ({testingState, updateTestingState}) => {

//     //console.log(props);


//     return (
//         <div>
//             <p>Hey, I'm a test component</p>
//             <p>{testingState}</p>
//             <button onClick={updateTestingState}>Change the state</button>
//         </div>
//     );
// }


// // Function that gets the state data that we want
// const mapStateToProps = (state) => {
//     return {
//         testingState: state.testingState
//     }
// }


// // Function that dispatch an action to modify the store data
// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateTestingState: () => {
//             dispatch({
//                 type: 'UPDATE_TESTING_STATE',
//                 newValue: 'This is the new updated State that was updated by dispatching and action!'
//             })
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);