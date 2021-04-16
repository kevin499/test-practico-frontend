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



export const searchResults = (query) => {
    return (dispatch) => {

        dispatch(itemsSearchLoading(true))

        return axios.get(`http://localhost:8080/api/items?q=${query}`)
            .then(res => res.data)
            .then(res => dispatch(addResultsSearch(res)))
            .catch(e => console.log(e))
            .then(_ => dispatch(itemsSearchLoading(false)))

    }
}


export const searchItem = (id) => {
    return (dispatch, getState) => {

        dispatch(itemLoading(true))

        return axios.get(`http://localhost:8080/api/items/${id}`)
            .then(res => res.data)
            .then(res => {
                if (getState().busqueda.items.length > 0) {
                    return dispatch(updateItem(res.item))
                }
                return dispatch(addItem(res.item))
            })
            .catch(e => console.log(e))
            .then(_ => dispatch(itemLoading(false)))
    }
}
