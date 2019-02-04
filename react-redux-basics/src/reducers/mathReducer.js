const mathReducer = (state = { result: 1, lastValues:[],}, action) => {
    switch(action.type)
    {
    case "ADD":
        state = {
            ...state,
            result: state.result + action.value,
            lastValues: [...state.lastValues, action.value]
        }
        break;
    case "SUBTRACT":
        state = {
            ...state,
            result: state.result - action.value,
            lastValues: [...state.lastValues, action.value]
        }
    break;
    }
    return state;
}

export default mathReducer;