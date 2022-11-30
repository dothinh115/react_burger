const burgerDefault = ({
    salad: 1,
    cheese: 1,
    beef: 1
});

const totalPriceDefault = 85;

export const burgerState = (state = burgerDefault, action) => {
     switch (action.type) {
        case "UPDATE_MENU": {
            let newState = {...state};
            for (let key in action.payload) {
                newState = {
                    ...newState,
                    [key]: action.payload[key]
                }
            }
            return newState;
        }
        default: return state;
     }
}

export const totalPrice = (state = totalPriceDefault, action) => {
    switch (action.type) {
        case "UPDATE_TOTAL_PRICE": {
            state = state + action.payload;
            return state;
        }
        default: return state;
    }
}