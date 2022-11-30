import { configureStore } from "@reduxjs/toolkit";
import { burgerState } from "./reducers/burgerReducers";

const store = configureStore({
    reducer: {
        burgerState
    }
});

export default store;