const editmodeReducer = (state = {mode:false}, action ) => {
  switch(action.type){
    case 'TURNONEDITMODE':
         const newState = { ...state, mode: true };
         return newState;
    case 'TURNOFFEDITMODE':
        const state1 = { ...state, mode: false};
        return state1;
    default :
    const state2 =  Object.assign({}, state);
    return state2;

  }
};
export default editmodeReducer;
