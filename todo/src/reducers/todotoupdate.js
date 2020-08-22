const todotoupdateReducer = (state =  {date:'',title:''}, action ) => {
  switch(action.type){
    case 'TODOTOUPDATE':
         return action.payload
    default :
         return state;
  }
};
export default todotoupdateReducer;
