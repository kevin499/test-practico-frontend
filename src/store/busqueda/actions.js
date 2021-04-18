import axios from 'axios'
import { itemsSearchLoading, itemLoading } from '../ui/actions'


export const addResultsSearch = (results) => {
    return {
        type: "ADD_RESULTS_SEARCH",
        payload: {
            ...results
        }
    }
}

export const updateItem = (item) => {
    return {
        type: "UPDATE_ITEM",
        payload: {
            item
        }
    }
}

export const addItem = (item) => {
    return {
        type: "ADD_ITEM",
        payload: {
            item
        }
    }
}

export const noItemsFound = () => {
    return {
        type: "NO_ITEMS_FOUND",
    }
}



export const searchResults = (query) => {
    return (dispatch) => {

        dispatch(itemsSearchLoading(true))

        return axios.get(`/api/items?q=${query}`)
            .then(res => res.data)
            .then(res => dispatch(addResultsSearch(res)))
            .catch(_ => dispatch(noItemsFound()))
            .then(_ => dispatch(itemsSearchLoading(false)))

    }
}


export const searchItem = (id) => {
    return (dispatch, getState) => {

        dispatch(itemLoading(true))

        return axios.get(`/api/items/${id}`)
            .then(res => res.data)
            .then(res => {
                if (getState().busqueda.items.length > 0) {
                    return dispatch(updateItem(res.item))
                }
                return dispatch(addItem(res.item))
            })

    }
}
