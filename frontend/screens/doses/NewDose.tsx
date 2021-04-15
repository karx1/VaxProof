import React, { Component } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import DrawerStackParamList from "../../types";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import styles from "../../styles";
import { Text } from "react-native-paper";

type Props = {
    navigation: DrawerNavigationProp<DrawerStackParamList, "NewDose">;
}

class NewDose extends Component<Props> {
    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <Text style={styles.header}>Add Dose</Text>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default NewDose;