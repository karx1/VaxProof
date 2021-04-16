import { DrawerNavigationProp } from "@react-navigation/drawer";
import axios from "axios";
import React, { Key, useEffect } from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import styles from "../styles";
import DrawerStackParamList from "../types";
import { api_url } from "../config.json";

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
        <View style={styles.wrapper}>
            <Text style={styles.header}>My Doses</Text>
            {doses.map((dose: Dose, index: Key) => {
                const d = new Date(Date.parse(dose.date));

                return (
                    <Card key={index}>
                        <Card.Title title={`Dose #${Number(index) + 1}`} subtitle={d.toDateString()} />
                        <Card.Content>
                            <Text>Test</Text>
                        </Card.Content>
                    </Card>
                )
            })}
        </View>
    )
}

export default MyDoses;