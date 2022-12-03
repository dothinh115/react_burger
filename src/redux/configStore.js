import { configureStore } from "@reduxjs/toolkit";
import { burgerState } from "./reducers/burgerReducers";
import { burgerMenu } from "./menuConfig";

const store = configureStore({
    reducer: {
        burgerState,
        burgerMenu
    }
});

export default store;