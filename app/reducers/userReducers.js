/* Reducer berfungsi untuk memanggil function di action dengan dimana ini logika yang diterapkan */

const initialState = {
    token: '',
    isLoading: true,
    isError: false,
}

function userReducers(state = initialState, action) {

    switch (action.type) {

        case "TOKEN_PENDING":
            return { ...state, isLoading: true, token: action.payload }
        case "TOKEN_FULFILLED":
            return { ...state, isLoading: false, token: action.payload.data }
        case "TOKEN_REJECTED":
            return { ...state, isLoading: false, isError: true }

        case "USER":
            return { ...state }

        default:
            return state
    }
}

export default userReducers