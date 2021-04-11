import React from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import DrawerStackParamList from "../types";
import { View } from "react-native";
import styles from "../styles";
import { Text, Button } from "react-native-paper";

type LoginScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, "Logout">;

type Props = {
    navigation: LoginScreenNavigationProp;
}

function Logout(props: Props) {
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Log out</Text>
            <Text>Are you sure you want to log out?</Text>
            <Text />
            <Button icon="logout-variant" mode="contained">Log Out</Button>
        </View>
    )
}

export default Logout;