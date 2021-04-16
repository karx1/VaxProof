import { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../styles";
import DrawerStackParamList from "../types";

type Props = {
    navigation: DrawerNavigationProp<DrawerStackParamList, "MyDoses">;
}

function MyDoses({ navigation }: Props) {
    const [doses, setDoses] = React.useState([]);
    const [finished, setFinished] = React.useState(false);

    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <Text>Coming soon!</Text>
        </View>
    )
}

export default MyDoses;