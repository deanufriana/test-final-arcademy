import { combineReducers } from 'redux'
import productsReducers from './productsReducers'
import cartReducers from './cartReducers'
import userReducers from './userReducers'

const reducers = combineReducers({
    productsReducers,
    cartReducers,
    userReducers
})

export default reducers