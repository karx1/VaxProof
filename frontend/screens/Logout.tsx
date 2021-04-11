import React from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import DrawerStackParamList from "../types";
import { View } from "react-native";
import styles from "../styles";
import { Text, Button } from "react-native-paper";
import axios from "axios";
import { API_URL } from "../constants";

type LoginScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, "Logout">;

type Props = {
    navigation: LoginScreenNavigationProp;
    onLogout: Function;
}

function Logout(props: Props) {

    const handleClick = async () => {
        await axios.get(`${API_URL}/api/users/logout`);

        props.onLogout();
        props.navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Log out</Text>
            <Text>Are you sure you want to log out?</Text>
            <Text />
            <Button icon="logout-variant" mode="contained" onPress={handleClick} >Log Out</Button>
        </View>
    )
}

export default Logout;