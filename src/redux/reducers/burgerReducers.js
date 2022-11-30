const burgerDefault = ({
    salad: 1,
    cheese: 1,
    beef: 1,
    total: 85
});

export const burgerState = (state = burgerDefault, action) => {
     switch (action.type) {
        case "UPDATE_MENU": {
            let newState = {...state};
            for (let key in action.payload) {
                if(key === "total") {
                    newState = {
                        ...newState,
                        [key]: newState[key] + action.payload[key]
                    }
                }
                else {
                    newState = {
                        ...newState,
                        [key]: action.payload[key]
                    }
                }
            }
            return newState;
        }
        case "LOAD_MENU": {
            let newState = {...state};
            for (let key in action.payload) {
                newState = {
                    ...newState,
                    [key]: action.payload[key]
                }
            }
            return newState
        }
        default: return state;
     }
}