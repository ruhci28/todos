const todotoupdateReducer = (state =  {category:'1',title:''}, action ) => {
  switch(action.type){
    case 'TODOTOUPDATE':
         return action.payload
    default :
         return state;
  }
};
export default todotoupdateReducer;
