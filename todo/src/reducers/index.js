import updatingtodo from './todotoupdate';
import editmode from './editmode';
import islogged from './islogged';
import {combineReducers} from 'redux';
// combine Reducers of all the reducers as store can take only a single Reducer
const rootReducer = combineReducers({
updatingtodo : updatingtodo,
editmode: editmode,
islogged:islogged
})
export default rootReducer;
