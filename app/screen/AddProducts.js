import React, { Component } from 'react'
import { Container, Header, View, Fab, Icon, Button, ListItem, Text, Left, Right, Body, Thumbnail, Input, List } from 'native-base'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import { GET_ORDERS, DELETE_ORDER, TRANSACTION, ADD_PRODUCT } from '../actions/products';

class AddProducts extends Component {

    componentDidMount() {
        this.props.dispatch(GET_ORDERS())
    }

    deleteOrder = async (id) => {
        await this.props.dispatch(DELETE_ORDER(id))
        this.props.dispatch(GET_ORDERS())
    }

    // transaction = (id) => {
    //     this.props.dispatch(TRANSACTION(id, total))
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <List>
                    <FlatList
                        keyExtractor={(index) => `index${index}`}
                        data={this.props.cart.results}
                        renderItem={({ item }) => (

                            <ListItem>

                                <Thumbnail square source={{ uri: item.product.image_url }} />

                                <Body>
                                    <Text> {item.product.name} </Text>
                                    <Text note numberOfLines={1}>Rp. {item.price}</Text>
                                    <Icon name='trash' onPress={() => this.deleteOrder(item.id)} />
                                </Body>


                                <Right>
                                    <Input keyboardType='numeric' placeholder={item.qty} />
                                </Right>

                            </ListItem>
                        )}>
                    </FlatList>

                    <Button style={{ margin: 20 }}>
                        <Text>Order</Text>
                    </Button>
                </List>
            </View>
        )
    }
}

const stateMapToProps = state => ({
    cart: state.cartReducers
})

export default connect(stateMapToProps)(AddProducts)