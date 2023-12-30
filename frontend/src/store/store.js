import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import modalReducer from './modelSlice';
import noteReducer from './noteSlice';
import filterReducer from './filterSlice';
import {myProfileReducer} from './userSlice';
import linkReducer from './linkSlice';
import dataReducer from './dataSlice';
import { userActionReducer } from './userSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer,
    myProfile: myProfileReducer,
    myLink: linkReducer,
    myData: dataReducer,
    actionData: userActionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

let persistor = persistStore(store)

export default store;
export { persistor };
