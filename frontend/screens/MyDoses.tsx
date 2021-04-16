import { DrawerNavigationProp } from "@react-navigation/drawer";
import axios from "axios";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../styles";
import DrawerStackParamList from "../types";
import {api_url} from "../config.json";

type Props = {
    navigation: DrawerNavigationProp<DrawerStackParamList, "MyDoses">;
}

type Dose = {
    product: string;
    date: string;
    clinic: string;
}

function MyDoses({ navigation }: Props) {
    const [doses, setDoses] = React.useState<Array<Dose>>([]);

    useEffect(() => {
        axios.get(`${api_url}/api/doses/my-doses/`).then(resp => {
            setDoses(resp.data);
        })
    }, []);

    return (
        <View style={styles.container}>
            <Text>Coming soon!</Text>
            {doses.map((dose: Dose) => {
                return <Text>{dose.date}</Text>
            })}
        </View>
    )
}

export default MyDoses;