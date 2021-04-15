import React, { Component } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import DrawerStackParamList from "../../types";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import styles from "../../styles";
import { Text, TextInput } from "react-native-paper";

type Props = {
    navigation: DrawerNavigationProp<DrawerStackParamList, "NewDose">;
}

interface IState {
    product: string;
    date: Date;
    clinic: string;
}

class NewDose extends Component<Props, IState> {
    state = {
        product: "",
        date: new Date(),
        clinic: ""
    }

    onChangeText = (name: string, text: string) => {
        //@ts-ignore
        this.setState({ [name]: text });
    }

    changeDate = (date: Date) => {
        this.setState({ date: date });
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <Text style={styles.header}>Add Dose</Text>
                    <View style={styles.input}>
                        <TextInput label="Product name/Manufacturer" onChangeText={text => this.onChangeText("product", text)} mode="outlined" autoCompleteType="off" />
                        <TextInput label="Clinic name" onChangeText={text => this.onChangeText("clinic", text)} mode="outlined" autoCompleteType="off" />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default NewDose;