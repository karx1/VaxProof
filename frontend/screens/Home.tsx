import { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import DrawerStackParamList from "../types";
import { BackHandler, View } from "react-native";
import { Text, Button } from "react-native-paper";
import styles from "../styles";

type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, 'Home'>;

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
            {authed ? (
                <>
                    The home screen for logged-in users is coming soon.
                </>
            )
                : (
                    <>
                        <View style={{ flexDirection: "row" }}>
                            <Button style={styles.button} mode="outlined" icon="login-variant">
                                Sign In
                            </Button>
                            <Text>{"\t"}</Text>
                            <Button style={styles.button} mode="outlined" icon="account-plus" onPress={() => navigation.navigate("Register")} >
                                Sign Up
                            </Button>
                        </View>
                    </>
                )}
        </View>
    )
}

export default Home;