import React, { Component } from 'react'
import { Container, Header, View, Fab, Icon, Button, List, ListItem, Text, Left, Right, Body, Thumbnail, Card, CardItem, ActivityIndicator, Input, Form, Item } from 'native-base'
import { Image, FlatList, AsyncStorage, Alert, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { LIST_PRODUCTS, CART_PRODUCTS, USER, ADD_PRODUCT } from '../actions/products'


class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            price: '',
            productName: '',
            token: '',
            showToast: false
        };

    }

    async componentDidMount() {
      //const getToken = await AsyncStorage.setItem('token', this.props.user.token)
        const token = await AsyncStorage.getItem('token')
        this.setState({ token })
        this.props.dispatch(LIST_PRODUCTS())
        this.props.dispatch(USER())

    }

    order = (item) => (
        ToastAndroid.showWithGravity(
            'Success Add Produk To Cart',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        ),
        this.props.dispatch(CART_PRODUCTS(item.price, item.id))
    )

    addProduct = async () => {
        await this.props.dispatch(ADD_PRODUCT(this.state.productName, this.state.price))
        this.props.dispatch(LIST_PRODUCTS())
        this.setState({
            price: '',
            productName: '',
        })
    }

    cardProduct = item => (
        <View>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: item.image_url }} />
                </Left>
                <Body>
                    <Text>{item.name}</Text>
                    <Text note numbitemerOfLines={1}>Rp. {item.price}</Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.order(item)}>
                        <Icon name='add' />
                    </Button>
                </Right>
            </ListItem>
        </View>
    )

    logout() {
        Alert.alert(
            'Do You Want To Logout ?',
            'You Will Cant Add Product Again',
            [
                {
                    text: 'OK', onPress: async () => {
                        await AsyncStorage.removeItem('token')
                        this.props.navigation.push('Home')
                    }
                },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: true }
        )
    }



    render() {
        return (
            <Container>
                <Header>


                    <Left />
                    <Body />

                    <Right>
                        {this.props.user.token === '' ?
                            <Button transparent onPress={() => this.props.navigation.navigate('LoginRegister')}>
                                <Text>Login</Text>
                            </Button> :
                            <Button transparent onPress={() => this.logout()}>
                                <Icon name='person' />
                            </Button>}
                    </Right>

                </Header>
                {this.props.user.token != '' &&
                    <Form>
                        
                        
                            <Text style={{margin: 17}}>Add Your Product</Text>
                        
                        <Item>
                            <Input value={this.state.productName} placeholder='Product Name' onChangeText={(productName) => this.setState({ productName })} />
                            <Input value={this.state.price} placeholder='Price' onChangeText={(price) => this.setState({ price })} />
                            <Icon name='send' style={{ marginRight: 5 }} onPress={() => this.addProduct()} />
                        </Item>
                    </Form>}

                    <Text style={{ alignSelf: 'flex-end', margin: 17 }}>Daftar Produk</Text>
                <FlatList
                    keyExtractor={(item, index) => `index${index}`}
                    data={this.props.product.results}
                    renderItem={({ item }) =>
                        this.cardProduct(item)}
                />

                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('AddProducts')}>
                    <Icon name="cart" />
                </Fab>

            </Container>
        )
    }
}

const stateMapToProps = (state) => ({
    product: state.productsReducers,
    user: state.userReducers
})

export default connect(stateMapToProps)(HomeScreen)