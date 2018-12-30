import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Input, Button, Text, Container, Form, Item, Content } from 'native-base';
import { LOGIN, REGISTER } from '../actions/products'
import { connect } from 'react-redux'

class LoginLogout extends Component {
    state = {
        wantLogin: true,
        username: '',
        email: '',
        password: '',
        isLoading: false
    }

    loginRegister = async () => {
        this.setState({ isLoading: true })
        if (this.state.wantLogin) {

            await this.props.dispatch(LOGIN(this.state.email, this.state.password))
            this.props.navigation.navigate('Home')
            this.setState({ isLoading: false })

        } else {

            await this.props.dispatch(REGISTER(this.state.username, this.state.email, this.state.password))
            this.props.navigation.navigate('Home')
            this.setState({ isLoading: false })

        }
    }

    render() {

        return (

            <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>


                <Form>
                    {this.state.wantLogin ||
                        <Item>
                            <Input placeholder="Username" onChangeText={(username) => this.setState({ username })} />
                        </Item>
                    }
                    <Item>
                        <Input placeholder="Email" onChangeText={(email) => this.setState({ email })} />
                    </Item>

                    <Item>
                        <Input placeholder="Password" secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                    </Item>
                </Form>

                <Button style={{ margin: 20 }} full onPress={() => this.loginRegister()}>
                    {this.state.isLoading ? <ActivityIndicator /> : this.state.wantLogin ? <Text> Login </Text> : <Text>Register </Text>}
                </Button>

                <Button style={{ margin: 20 }} success full onPress={() => this.setState({ wantLogin: !this.state.wantLogin })}>

                    <Text>

                        {this.state.wantLogin ? 'Create Account' : 'Login Account'}
                    </Text>

                </Button>


            </View>

        )
    }
}

export default connect()(LoginLogout)