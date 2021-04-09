import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../styles";
import DrawerStackParamList from "../types";

type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, "Register">;

type Props = {
    navigation: ProfileScreenNavigationProp;
    token: string;
}

function isBlank(str: string) {
    return (!str || /^\s*$/.test(str));
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

        this.setState({ errors: errors }, () => {
            console.log(this.state.errors);
        })
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <Text style={styles.header}>Register</Text>
                    <View style={styles.input}>
                        <TextInput label="First Name" onChangeText={(text: string) => this.onTextChange("first_name", text)} mode="outlined" />
                        {/* 
                        //@ts-ignore */}
                        {"first_name" in this.state.errors && this.state.errors["first_name"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Last Name" onChangeText={(text: string) => this.onTextChange("last_name", text)} mode="outlined" />
                        {/* 
                        //@ts-ignore */}
                        {"last_name" in this.state.errors && this.state.errors["last_name"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Username" onChangeText={(text: string) => this.onTextChange("username", text)} mode="outlined" />
                        {/* 
                        //@ts-ignore */}
                        {"username" in this.state.errors && this.state.errors["username"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Email" onChangeText={(text: string) => this.onTextChange("email", text)} mode="outlined" />
                        {/* 
                        //@ts-ignore */}
                        {"email" in this.state.errors && this.state.errors["email"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Password" onChangeText={(text: string) => this.onTextChange("password", text)} mode="outlined" />
                        {/* 
                        //@ts-ignore */}
                        {"password" in this.state.errors && this.state.errors["password"].map((errorMessage: string, index: Number) => <Text key={index} style={styles.error} >{errorMessage}</Text>)}
                        <TextInput label="Confirm Password" onChangeText={(text: string) => this.onTextChange("confirm", text)} mode="outlined" />
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