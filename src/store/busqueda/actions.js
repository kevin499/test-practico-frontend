import axios from 'axios'


export const addResults = (results) => {
    return {
        type: "ADD_RESULTS",
        payload: {
            ...results,
            data_loading: false
        }
    }
}

export const dataLoading = () => {
    return {
        type: "DATA_LOADING"
    }
}

export const completeItem = (item) => {
    return {
        type: "COMPLETE_ITEM",
        payload: {
            item,
            data_loading: false
        }
    }
}

export const addItem = (item) => {
    return {
        type: "ADD_ITEM",
        payload: {
            item,
            data_loading: false
        }
    }
}



export const changeResults = (query) => {
    return (dispatch, getState) => {

        dispatch(dataLoading())

        return axios.get(`http://localhost:8080/api/items?q=${query}`)
            .then(res => res.data)
            .then(res => {
                dispatch(addResults(res))
            })
    }
}


export const changeItem = (id) => {
    return (dispatch, getState) => {

        dispatch(dataLoading())

        return axios.get(`http://localhost:8080/api/items/${id}`)
            .then(res => res.data)
            .then(res => {
                if(getState().items.length > 0){
                    dispatch(completeItem(res.item))
                }
                else{
                    dispatch(addItem(res.item))
                }

                return res.item
            })
    }
}
