import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";
import DrawerStackParamList from "../types";
import { API_URL } from "../constants";
import axios from "axios";
import { View, Text } from "react-native";
import styles from "../styles";

type Props = DrawerScreenProps<DrawerStackParamList, "Home">;

interface IState {
    authed: boolean
}

class Home extends React.Component<Props, IState> {
    state = {
        authed: false
    }

    constructor(props: Props) {
        super(props);

        axios.get(`${API_URL}/api/authed`).then(resp => {
            console.log(resp.data);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>TODO</Text>
            </View>
        )
    }
}


export default Home;