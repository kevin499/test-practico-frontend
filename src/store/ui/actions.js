
export const itemsSearchLoading = (loading) => {
    return {
        type: "ITEMS_SEARCH_LOADING",
        payload: loading
    }
}

export const itemLoading = (loading) => {
    return {
        type: "ITEM_LOADING",
        payload: loading
    }
}
