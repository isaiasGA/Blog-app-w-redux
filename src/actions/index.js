//With redux-thunk, action creators can now return FUNCTIONS instead of just being able to return action-objects
//we must import te lodash library into a project by using _ symbols
import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceHolder";
//Functions returned by action-creators can now have a 'dispatch' and 'getState' arguments
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    //Chanin will allow us to...well.. chain  functions that work in coop and  in conjuction, will manipulate data in our app
    .map("userId") // map is chain to .chain so Whatever is the inside of .chain will be the argument to .map(). tHIS Means that '.posts' will be passed in as the first argument in .map(). We just need to define the SECOND ARGUMENT
    //We are using 'loDash' version of MAPS(_.map) in order to map over the posts and get the ID for each user
    //'userIds' is a function that gets the id's of all of the users who have posted a blog post
    //Iterate over the list of IDs and for each ID, call the 'fetch'user' action creator and finnaly, we are going to DISPATCH the result
    .uniq() //The result of map() will then be passed in to uniq() as the FIRST ARGUMENT
    .forEach(id => dispatch(fetchUser(id))) //Result of uniq() will then be passed on to forEach()
    //no need to use 'await' becuase there is no code running after finding our ids. NOTE: We would need to modify our code if we were to use 'await' since forEach and await arent compatible
    .value(); // use .value() to EXECUTE all of the chained functions chained above
};

//When fetching ddata, it is important to understand that 'async' and 'await' will return data whenever we are making an API request. Without 'async' or 'await', we will only be getting back a 'PROMISE', which it will take sometime to be completed before it can return data back to us
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  //we need to use 'dispatch' to return an action-object MANUALLY
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

//Setting up an action creator that will FETCH one USER at a time by using their unique ID
//We set up 'memoize' in order to avoid re-recrating the 'action-creator' function each time we run our reducer. REMEMBER that each time that we run our action ceator (fetchUser), we are making multiple network requests(const = response), so 'memoize' is helping us keep that in check
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};
