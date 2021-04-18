const initialState = {
    author: {
        name: "",
        lastname: ""
    },
    categories: [],
    items: [],
}

const busquedaReducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_RESULTS_SEARCH":
            return { ...action.payload }
        case "UPDATE_ITEM":
            return {
                ...state,
                items: [
                    ...state.items.map(item => item.id === action.payload.item.id ? { ...item, ...action.payload.item } : item)
                ],
            }
        case "ADD_ITEM":
            return {
                ...state,
                items: [
                    action.payload.item
                ],
            }
        case "NO_ITEMS_FOUND":
            return{
                ...state,
                items: []
            }
        default:
            return state
    }

}

export default busquedaReducer