import updatingtodo from './todotoupdate';
import editmode from './editmode';
import islogged from './islogged';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
updatingtodo : updatingtodo,
editmode: editmode,
islogged:islogged
})
export default rootReducer;
