import axios from 'axios'
import ip from '../config'
import AsyncStorage from 'react-native'

export function LIST_PRODUCTS() {
    return {
        type: "LIST_PRODUCTS",
        payload: axios.get(`${ip}/products`)
    }
}

export function ADD_PRODUCT(name, price) {
    return {
        payload: axios.post(`${ip}/product`, {
            name,
            price,
            image_url: 'https://www.wpclipart.com/buildings/shop.png'
        })
    }
}

export function GET_TRANSACTION(id) {
    return {
        type: "GET_TRANSACTION",
        payload: axios.get(`${ip}/transaction/${id}`)
    }
}

export function CART_PRODUCTS(price, product_id) {
    return {
        payload: axios.post(`${ip}/order`, {
            product_id,
            price,
        })
    }
}

export function GET_ORDERS() {
    return {
        type: "GET_ORDERS",
        payload: axios.get(`${ip}/orders`)
    }
}

export function EDIT_ORDER(id, qty) {
    return {
        payload: axios.patch(`${ip}/order/${id}`, {
            qty
        })
    }
}

export function LOGIN(email, password) {
    return {
        type: 'TOKEN',
        payload: axios.post(`${ip}/login`, {
            email,
            password
        }).then((response) => response.data.token)
    }
}

export function REGISTER(username, email, password) {
    return {
        type: 'TOKEN',
        payload: axios.post(`${ip}/register`, {
            username,
            email,
            password
        }).then( async (response) =>
            await AsyncStorage.setItem('token', response.data.token),
            response.data.token
        )
    }
}

export function DELETE_ORDER(id) {
    return {
        payload: axios.delete(`${ip}/order/${id}`)
    }
}

export function USER() {
    return {
        type: 'USER'
    }
}

export function TRANSACTION(order_id, total) {
    return {
        payload: axios.post(`${ip}/transaction`, {
            order_id,
            total
        })

    }
}

export function ORDER_UPDATE(id) {
    return {
        payload: axios.patch(`${ip}/order/${id}`)
    }
}