// import { addResults } from './actions'

const initialState = {
    author: {
        name: "",
        lastname: ""
    },
    categories: [],
    items: [],
    data_loading: false,

}

const busqueda = (state = initialState, action) => {

    switch (action.type) {
        case "DATA_LOADING_SEARCH":
            return { ...state, items: [], data_loading: action.payload }
        case "DATA_LOADING_ITEM":
            return { ...state, data_loading: action.payload }
        case "ADD_RESULTS":
            return { ...action.payload }
        case "COMPLETE_ITEM":
            return {
                ...state,
                items: [
                    ...state.items.map(item => item.id === action.payload.item.id ? action.payload.item : item)
                ],
                data_loading: action.payload.data_loading
            }
        case "ADD_ITEM":
            return {
                ...state,
                items: [
                    action.payload.item
                ],
                data_loading: action.payload.data_loading
            }
        default:
            return state
    }

}

export default busqueda