import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import DrawerStackParamList from "../types";
import { API_URL } from "../constants";
import axios from "axios";
import { View, Text } from "react-native";
import styles from "../styles";

type Props = DrawerScreenProps<DrawerStackParamList, "Home">;

function Home(props: Props) {
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/authed`).then(resp => {
            setAuthed(resp.data);
        })
    })

    return (
        <View style={styles.container}>
            <Text>Hello!</Text>
            {authed ? <Text>You are authenticated.</Text> : <Text>You are not authenticated.</Text>}
        </View>
    )
}

export default Home;