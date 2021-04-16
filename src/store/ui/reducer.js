const initialState = {
    items_search_loading: false,
    item_loading: false
}

const uiReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ITEMS_SEARCH_LOADING':
            return {...state, items_search_loading: action.payload}
        case 'ITEM_LOADING':
            return {...state, item_loading: action.payload}
        default:
            return state
    }
}

export default uiReducer