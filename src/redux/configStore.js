import { configureStore } from "@reduxjs/toolkit";
import { burgerState, burgerMenu } from "./reducers/burgerReducers";

const store = configureStore({
    reducer: {
        burgerState,
        burgerMenu
    }
});

export default store;