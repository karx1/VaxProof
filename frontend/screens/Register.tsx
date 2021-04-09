import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../styles";
import DrawerStackParamList from "../types";

type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, "Register">;

type Props = {
    navigation: ProfileScreenNavigationProp;
}

class Register extends React.Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Coming soon!</Text>
            </View>
        )
    }
}

export default Register;