import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "../feature/userSlice";
import { persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import createFilter from "redux-persist-transform-filter"
import chatSlice from "../feature/chatSlice";


const saveUserOnlyFilter=createFilter("user", ["user"]);

const persistConfig = {
    key : "user",
    storage,
    whitelist: ["user"],
    transforms: [saveUserOnlyFilter],
}

const rootReducer=combineReducers({
    user: userSlice,
    chat: chatSlice,
});

const persistedReducer =  persistReducer(persistConfig, rootReducer);

export const store=configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware(
        {
            serializableCheck:false,
        }
    ),
    devTools:true,
});

export const persister = persistStore(store);