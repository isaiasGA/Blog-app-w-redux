export default (state = [], action) => {
  //Remember: We use 'switch' whenever we have more than one value that we want to evaluate
  // ':' colon will mean what we want to do if the 'case' is met correctly
  //This is usefull in case we have more than one type of cases
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    //We set up a 'default' case in case we do not match the case of  'FETCH_POST'
    default:
      return state;
  }
};

//When setting up a 'reducer', it is very important to set up a VALUE, even if it's null. This is done in order to avoid having an UNDEFINED error message
