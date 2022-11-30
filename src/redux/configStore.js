import { configureStore } from "@reduxjs/toolkit";
import { burgerState, totalPrice } from "./reducers/burgerReducers";

const store = configureStore({
    reducer: {
        burgerState,
        totalPrice
    }
});

export default store;