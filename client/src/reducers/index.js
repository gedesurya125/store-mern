import { combineReducers } from 'redux';

import itemReducer from './items';
import globalReducer from './global'

export default combineReducers({ itemReducer, globalReducer });