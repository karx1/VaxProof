import { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import DrawerStackParamList from "../types";
import { BackHandler, View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../styles";

type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList,'Home'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
    authed: boolean;
};

function Home({ navigation, authed }: Props) {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.toggleDrawer(); return true; }
        )

        return backHandler.remove;
    })

    return (
        <View style={styles.container}>
            <Text>Hello!</Text>
            {authed ? <Text>You are authenticated.</Text> : <Text>You are not authenticated.</Text>}
        </View>
    )
}

export default Home;