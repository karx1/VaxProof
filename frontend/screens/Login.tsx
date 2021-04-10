import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, TextInput, Button } from "react-native-paper";
import styles from "../styles";
import DrawerStackParamList from "../types";

type LoginScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, "Login">;

type Props = {
    navigation: LoginScreenNavigationProp;
    token: string;
}

interface IState {
    username: string;
    password: string;
}

class Login extends React.Component<Props, IState> {
    state = {
        username: "",
        password: ""
    }

    onChangeText = (name: string, text: string) => {
        //@ts-ignore
        this.setState({ [name]: text });
    }
    
    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <Text style={styles.header}>Log In</Text>
                    <View style={styles.input}>
                        <TextInput label="Username" onChangeText={text => this.onChangeText("username", text)} mode="outlined" autoCapitalize="none" autoCompleteType="username" />
                        <TextInput label="Password" onChangeText={text => this.onChangeText("username", text)} mode="outlined" autoCapitalize="none" autoCompleteType="password" secureTextEntry={true} />

                        <Button mode="contained" icon="login-variant" style={styles.submit}>Log In</Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default Login;