const isloggedReducer = (state = {islogged:false}, action ) => {
  switch(action.type){
    case 'LOGIN':
         const newState = { ...state, islogged: true };
         return newState;
    case 'LOGOUT':
        const state1 = { ...state, islogged: false};
        return state1;
    default :
    const state2 =  Object.assign({}, state);
    return state2;

  }
};
export default isloggedReducer;
