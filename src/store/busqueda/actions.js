import axios from 'axios'
import { itemsSearchLoading, itemLoading} from '../ui/actions'


export const addResults = (results) => {
    return {
        type: "ADD_RESULTS",
        payload: {
            ...results
        }
    }
}

export const completeItem = (item) => {
    return {
        type: "COMPLETE_ITEM",
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



export const changeResults = (query) => {
    return (dispatch, getState) => {

        dispatch(itemsSearchLoading(true))

        return axios.get(`http://localhost:8080/api/items?q=${query}`)
            .then(res => res.data)
            .then(res => {
                dispatch(addResults(res))
            })
            .catch(e => {
                console.log(e)
            })
            .finally( _ => {
                dispatch(itemsSearchLoading(false))
            })

    }
}


export const changeItem = (id) => {
    return (dispatch, getState) => {

        dispatch(itemLoading(true))

        return axios.get(`http://localhost:8080/api/items/${id}`)
            .then(res => res.data)
            .then(res => {
                if (getState().busqueda.items.length > 0) {
                    dispatch(completeItem(res.item))
                }
                else {
                    dispatch(addItem(res.item))
                }

                return res.item
            })
        .finally( _ =>  dispatch(itemLoading(false))) 
    }
}
