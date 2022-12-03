export const burgerMenuDefault = [
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

export const burgerMenu = (state = burgerMenuDefault, action) => {
    switch(action.type) {
        case "UPDATE_DRAG": {
            let nextState = [...state];
            const {start, end} = action.payload;
            let firstGlass = nextState.findIndex(item => item.name === start);
            let secondGlass = nextState.findIndex(item => item.name === end);
            let middle = nextState[firstGlass];
            nextState[firstGlass] = nextState[secondGlass];
            nextState[secondGlass] = middle;
            return nextState;
        }
        default: return state;
    }
}
