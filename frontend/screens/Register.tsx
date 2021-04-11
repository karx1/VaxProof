import { DrawerNavigationProp } from "@react-navigation/drawer";
import axios, { AxiosRequestConfig } from "axios";
import React from "react";
import { Alert, KeyboardAvoidingView, Platform, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../styles";
import DrawerStackParamList from "../types";
import { API_URL } from "../constants";
import { isBlank, assert } from "../utils";

type RegisterScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, "Register">;

type Props = {
    navigation: RegisterScreenNavigationProp;
    token: string;
}

interface IState {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    confirm: string;
    errors: Object;
}

class Register extends React.Component<Props, IState> {
    state = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm: "",
        errors: {},
    }

    onTextChange = (name: string, text: string) => {
        //@ts-ignore
        this.setState({ [name]: text });
    }

    onSubmit = async () => {
        const errors = {};
        for (const [key, value] of Object.entries(this.state)) {
            if (isBlank(value.toString())) {
                //@ts-ignore
                if (!(key in errors)) errors[key] = [];
                //@ts-ignore
                errors[key].push("Please fill out this field.");
            }
        }

        if (this.state.password !== this.state.confirm) {
            //@ts-ignore
            if (!("password" in errors)) errors["password"] = [];
            //@ts-ignore
            errors["password"].push("Both passwords must match each other.");

            //@ts-ignore
            if (!("confirm" in errors)) errors["confirm"] = [];
            //@ts-ignore
            errors["confirm"].push("Both passwords must match each other.");
        }

        const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "@^\*\(\)]).*$/;

        if (!passwordRegex.test(this.state.password)) {
            //@ts-ignore
            if (!("password" in errors)) errors["password"] = [];
            //@ts-ignore
            errors["password"].push("Not a valid password.");
        }

        if (!passwordRegex.test(this.state.confirm)) {
            //@ts-ignore
            if (!("confirm" in errors)) errors["confirm"] = [];
            //@ts-ignore
            errors["confirm"].push("Not a valid password.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(this.state.email)) {
            //@ts-ignore
            if (!("email" in errors)) errors["email"] = [];
            //@ts-ignore
            errors["email"].push("Not a valid email.");
        }

        this.setState({ errors: errors }, () => {
            console.log(this.state.errors);
            if (Object.keys(this.state.errors).length === 0) {
                const data: FormData = new FormData();
                for (const [key, value] of Object.entries(this.state)) {
                    if (key !== "confirm" && key !== "errors") {
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
                    url: `${API_URL}/api/users/register/`,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

                axios(config).then(resp => {
                    const { data } = resp;

                    const errors = {};
                    if (data.status === 409) {
                        for (const [key, value] of Object.entries(data)) {
                            if (key !== "status") {
                                //@ts-ignore
                                errors[key] = value;
                            }
                        }

                        this.setState({ errors: errors }, () => console.log(this.state.errors));
                    } else {
                        const { detail, status } = data;

                        assert(status == 201, "Status was not 201!");

                        console.log(detail);

                        Alert.alert(
                            detail,
                            "Please log in.",
                            [   
                                { text: "OK", onPress: () => {this.props.navigation.navigate("Login")}}
                            ]
                        );
                    }
                    
                });
            }
        })
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <Text style={styles.header}>Register</Text>
                    <View style={styles.input}>
                        <TextInput label="First Name" onChangeText={(text: string) => this.onTextChange("first_name", text)} mode="outlined" error={"first_name" in this.state.errors} autoCompleteType="name" />
                        {/* 
                        //@ts-ignore */}
                        {"first_name" in this.state.errors && this.state.errors["first_name"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Last Name" onChangeText={(text: string) => this.onTextChange("last_name", text)} mode="outlined" error={"last_name" in this.state.errors} autoCompleteType="name" />
                        {/* 
                        //@ts-ignore */}
                        {"last_name" in this.state.errors && this.state.errors["last_name"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Username" onChangeText={(text: string) => this.onTextChange("username", text)} mode="outlined" error={"username" in this.state.errors} autoCapitalize="none" autoCompleteType="username" />
                        {/* 
                        //@ts-ignore */}
                        {"username" in this.state.errors && this.state.errors["username"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Email" onChangeText={(text: string) => this.onTextChange("email", text)} mode="outlined" error={"email" in this.state.errors} autoCapitalize="none" autoCompleteType="email" keyboardType="email-address" />
                        {/* 
                        //@ts-ignore */}
                        {"email" in this.state.errors && this.state.errors["email"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Password" onChangeText={(text: string) => this.onTextChange("password", text)} mode="outlined" error={"password" in this.state.errors} autoCapitalize="none" autoCompleteType="password" secureTextEntry={true} />
                        {/* 
                        //@ts-ignore */}
                        {"password" in this.state.errors && this.state.errors["password"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Confirm Password" onChangeText={(text: string) => this.onTextChange("confirm", text)} mode="outlined" error={"confirm" in this.state.errors} autoCapitalize="none" autoCompleteType="password" secureTextEntry={true} />
                        {/* 
                        //@ts-ignore */}
                        {"confirm" in this.state.errors && this.state.errors["confirm"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}

                        <Button mode="contained" icon="account-plus" style={styles.submit} onPress={this.onSubmit} >Sign Up</Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default Register;