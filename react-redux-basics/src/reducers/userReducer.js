const userReducer = (state = {name:'Max', age:28}, action) => {
    switch(action.type)
    {
    case "SET_NAME":
        state = {
            ...state,
            name: action.value
        }
        break;
    case "SET_AGE":
        state = {
            ...state,
            age: action.value
        }
        break;
    }
    return state;
}

export default userReducer;