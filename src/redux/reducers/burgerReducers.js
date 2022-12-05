const burgerMenuDefault = [
    {
        name: "salad",
        numberDefault: 1,
        price: 15
    },
    {
        name: "cheese",
        numberDefault: 1,
        price: 20
    },
    {
        name: "beef",
        numberDefault: 1,
        price: 55
    }
];

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


export const burgerMenu = (state = burgerMenuDefault, action) => {
    switch(action.type) {
        case "UPDATE_DRAG": {
            let nextState = [...state];
            const {start, end} = action.payload;
            if(start && end) {
                let firstGlass = nextState.findIndex(item => item.name === start);
                let secondGlass = nextState.findIndex(item => item.name === end);
                let middle = nextState[firstGlass];
                nextState[firstGlass] = nextState[secondGlass];
                nextState[secondGlass] = middle;
            }
            return nextState;
        }
        case "LOAD_MENU": {
            state = action.payload;
            return state;
        }
        default: return state;
    }
}