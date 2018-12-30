/* Reducer berfungsi untuk memanggil function di action dengan dimana ini logika yang diterapkan */

const initialState = {
    results: [],
    isLoading: false,
    isError: false
}

function productsReducers(state = initialState, action) {
    console.log(action)
    switch (action.type) {

        case "LIST_PRODUCTS_PENDING":
            return { ...state, isLoading: true }
        case "LIST_PRODUCTS_FULFILLED":
            return { ...state, isLoading: false, results: action.payload.data }
        case "LIST_PRODUCTS_REJECTED":
            return { ...state, isLoading: false, isError: true }

        default:
            return state
    }
}

export default productsReducers