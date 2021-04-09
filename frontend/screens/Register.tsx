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

class Register extends React.Component<Props, any> {
    onTextChange = (name: string, text: string) => {
        //@ts-ignore
        this.setState({ [name]: text });
    }

    onSubmit = async () => {
        for (const key in this.state) {
            const value = this.state[key];

            console.log(key, value);
        }
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <Text style={styles.header}>Register</Text>
                    <View style={styles.input}>
                        <TextInput label="First Name" onChangeText={(text: string) => this.onTextChange("first_name", text)} mode="outlined" />
                        <TextInput label="Last Name" onChangeText={(text: string) => this.onTextChange("last_name", text)} mode="outlined" />
                        <TextInput label="Username" onChangeText={(text: string) => this.onTextChange("username", text)} mode="outlined" />
                        <TextInput label="Email" onChangeText={(text: string) => this.onTextChange("email", text)} mode="outlined" />
                        <TextInput label="Password" onChangeText={(text: string) => this.onTextChange("password", text)} mode="outlined" />
                        <TextInput label="Confirm Password" onChangeText={(text: string) => this.onTextChange("confirm", text)} mode="outlined" />

                        <Button mode="contained" icon="account-plus" style={styles.submit} onPress={this.onSubmit} >Sign Up</Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default Register;