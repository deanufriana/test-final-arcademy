import React, { Component } from 'react'
import { View, ActivityIndicator, AsyncStorage } from 'react-native'
import { Input, Button, Text, Container, Form, Item, Content } from 'native-base';
import { connect } from 'react-redux'
import axios from 'axios';
import ip from '../config'

class LoginLogout extends Component {
    state = {
        wantLogin: true,
        username: '',
        email: '',
        password: '',
        isLoading: false
    }

    loginRegister = () => {

        this.setState({ isLoading: true })

        if (this.state.wantLogin) {
            axios.post(`${ip}/login`,
                {
                    email: this.state.email,
                    password: this.state.password,

                }
            ).then(async (response) => {
                console.log(response.data.token)
                try {

                    await AsyncStorage.setItem('token', response.data.token).then(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.push('Home')
                    })

                } catch (error) {

                    this.setState({ isLoading: false })
                    alert(error)

                }

            }).catch((error) => {

                alert('Username & Password Salah')
                this.setState({ isLoading: false })

            })

        } else {

            axios.post(`${ip}/register`,
                {
                    email: this.state.email,
                    password: this.state.password,
                    username: this.state.username,
                }
            ).then((response) => {

                try {

                    AsyncStorage.setItem('token', response.data.token).then(() => {
                        this.props.navigation.push('Home')
                        this.setState({ isLoading: false })

                    })

                } catch (error) {

                    this.setState({ isLoading: false })
                    alert(error)

                }


            }).catch((error) => {

                alert('Username & Password Salah')
                this.setState({ isLoading: false })

            })
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