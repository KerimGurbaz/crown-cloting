import { combineReducers } from "redux";  

import { userReducer } from './user/user.reducer';

import {categoriesReducer} from './user/user.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    categories:categoriesReducer,
});