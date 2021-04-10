import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../styles";
import DrawerStackParamList from "../types";

type LoginScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, "Login">;

type Props = {
    navigation: LoginScreenNavigationProp;
    token: string;
}

class Login extends React.Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Coming soon!</Text>
                <Text>{this.props.token}</Text>
            </View>
        )
    }
}

export default Login;