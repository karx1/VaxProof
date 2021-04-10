import { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { Key } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, TextInput, Button } from "react-native-paper";
import styles from "../styles";
import DrawerStackParamList from "../types";
import { isBlank } from "../utils";

type LoginScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, "Login">;

type Props = {
    navigation: LoginScreenNavigationProp;
    token: string;
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

        this.setState({ errors: errors }, () => {console.log(this.state.errors)});
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