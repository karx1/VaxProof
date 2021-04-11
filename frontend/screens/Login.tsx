import { DrawerNavigationProp } from "@react-navigation/drawer";
import axios, { AxiosRequestConfig } from "axios";
import React, { Key } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, TextInput, Button } from "react-native-paper";
import { API_URL } from "../constants";
import styles from "../styles";
import DrawerStackParamList from "../types";
import { assert, isBlank } from "../utils";

type LoginScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, "Login">;

type Props = {
    navigation: LoginScreenNavigationProp;
    token: string;
    onLogin: Function;
}

interface IState {
    username: string;
    password: string;
    errors: { [key: string]: Array<string> };
}

class Login extends React.Component<Props, IState> {
    state = {
        username: "",
        password: "",
        errors: {}
    }

    onChangeText = (name: string, text: string) => {
        //@ts-ignore
        this.setState({ [name]: text });
    }

    onSubmit = () => {
        const errors: { [key: string]: Array<string> } = {};
        for (const [key, value] of Object.entries(this.state)) {
            console.log(key, value);
            if (isBlank(value.toString())) {
                if (!(key in errors)) errors[key] = [];
                errors[key].push("Please fill out this field.");
            }
        }

        const regex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "@^\*\(\)]).*$/;

        if (!regex.test(this.state.password)) {
            if (!("password" in errors)) errors["password"] = [];
            errors["password"].push("Not a valid password.");
        }

        this.setState({ errors: errors }, () => {
            console.log(this.state.errors);
            if (Object.keys(this.state.errors).length === 0) {
                const data: FormData = new FormData();

                for (const [key, value] of Object.entries(this.state)) {
                    if (key !== "errors") {
                        data.append(key, value.toString());
                    }
                }

                //@ts-ignore
                for (const key in data) {
                    //@ts-ignore
                    console.log(key, data[key]);
                }

                const config: AxiosRequestConfig = {
                    method: "POST",
                    data: data,
                    url: `${API_URL}/api/users/login/`,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };

                axios(config).then(resp => {
                    const { data } = resp;
                    
                    if (data.status === 400) {
                        const errors: { [key: string]: Array<string> } = {};
                        for (const [key, value] of Object.entries(data)) {
                            if (key !== "status") {
                                if (!(key in errors)) errors[key] = [];
                                //@ts-ignore
                                errors[key].push(value);
                            }
                        }

                        this.setState({ errors: errors });
                    } else {
                        const { detail, status } = data;

                        assert(status === 200, "Status was not 200!");

                        console.log(detail);

                        this.props.onLogin();
                        this.props.navigation.navigate('Home');
                    }
                })
            }
        });
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <Text style={styles.header}>Log In</Text>
                    <View style={styles.input}>
                        <TextInput label="Username" onChangeText={text => this.onChangeText("username", text)} mode="outlined" autoCapitalize="none" autoCompleteType="username" error={"username" in this.state.errors} />
                        {/* 
                        //@ts-ignore */}
                        {"username" in this.state.errors && this.state.errors["username"].map((errorMessage: string, index: Key) => <Text key={index} style={styles.error}>{errorMessage}</Text>)}
                        <TextInput label="Password" onChangeText={text => this.onChangeText("password", text)} mode="outlined" autoCapitalize="none" autoCompleteType="password" secureTextEntry={true} error={"password" in this.state.errors} />
                        {/* 
                        //@ts-ignore */}
                        {"password" in this.state.errors && this.state.errors["password"].map((errorMessage: string, index: Key) => <Text key={index} style={styles.error}>{errorMessage}</Text>)}

                        <Button mode="contained" icon="login-variant" style={styles.submit} onPress={this.onSubmit} >Log In</Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default Login;