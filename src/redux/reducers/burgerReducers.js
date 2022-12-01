import { burgerMenuDefault } from "../menuConfig";
const burgerDefault = () => {
    let burger = {};
    for (let value of burgerMenuDefault) {
        burger = {
            ...burger,
            [value.name]: value.numberDefault
        }
    }
    return burger;
}
export const burgerState = (state = burgerDefault(), action) => {
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