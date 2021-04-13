import { addResults } from './actions'

const initialState = {
    author: {
        name: "",
        lastname: ""
    },
    categories: [],
    items: []
}

const busqueda = (state = initialState, action) => {

    switch (action.type) {
        case "DATA_LOADING":
            return { ...state, data_loading: true }
        case "ADD_RESULTS":
            return { ...action.payload }
        case "COMPLETE_ITEM":
            return {
                ...state,
                items: [
                    ...state.items.map(item => item.id == action.payload.item.id ? action.payload.item : item)
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