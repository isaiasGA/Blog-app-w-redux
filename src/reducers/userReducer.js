export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER":
      //We always need to return a NEW ARRAY/OBJECT/VALUE-STRING any time we are returning data from a REDUCER
      //This is done in order for REDUX to realize that we have made a change in the data in our application, and therfore the application can be updated. React side will re-render and it will pull some new content on the screen.
      return [...state, action.payload];
    default:
      return state;
  }
};
