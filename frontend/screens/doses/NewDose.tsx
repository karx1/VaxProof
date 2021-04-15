import React, { Component, Key } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import DrawerStackParamList from "../../types";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import styles from "../../styles";
import { Button, Text, TextInput } from "react-native-paper";
import { isBlank } from "../../utils";
import axios, { AxiosRequestConfig } from "axios";
import { api_url } from "../../config.json";

type Props = {
    navigation: DrawerNavigationProp<DrawerStackParamList, "NewDose">;
    token: string;
}

interface IState {
    product: string;
    date: Date;
    orig_date: string;
    clinic: string;
    errors: { [key: string]: Array<string> };
}

class NewDose extends Component<Props, IState> {
    state = {
        product: "",
        date: new Date(),
        orig_date: "",
        clinic: "",
        errors: {}
    }

    onChangeText = (name: string, text: string) => {
        //@ts-ignore
        this.setState({ [name]: text });
    }

    parseDate = (text: string) => {
        const d = new Date(Date.parse(text))

        this.setState({ date: d, orig_date: text }, () => console.log(this.state.date.toUTCString()));
    }

    onSubmit = () => {
        console.log(this.props.token);

        const errors: { [key: string]: Array<string> } = {};
        for (const [key, value] of Object.entries(this.state)) {
            console.log(key, value);
            if (key !== "orig_date" && isBlank(value.toString())) {
                if (!(key in errors)) errors[key] = [];
                errors[key].push("Please fill out this field.");
            }
        }

        if (isBlank(this.state.orig_date)) {
            if (!("date" in errors)) errors["date"] = [];
            errors["date"].push("Please fill out this field.");
        }

        const regex = /\d{2}\/\d{2}\/\d{4}/;

        if (!regex.test(this.state.orig_date) || !(this.state.date instanceof Date && !isNaN(this.state.date.valueOf()))) {
            if (!("date" in errors)) errors["date"] = [];
            errors["date"].push("Please enter a valid date. Dates should be in MM/DD/YYYY format.");
        }

        this.setState({ errors: errors }, () => {
            console.log(this.state.errors);
            if (Object.keys(this.state.errors).length === 0) {
                const data: FormData = new FormData();

                for (const [key, value] of Object.entries(this.state)) {
                    if (key !== "errors" && key !== "orig_date") {
                        data.append(key, value.toString());
                    }
                }

                //@ts-ignore
                for (const key in data) {
                    //@ts-ignore
                    console.log(key, data[key]);
                }

                const config: AxiosRequestConfig = {
                    method: "POST",
                    data: data,
                    url: `${api_url}/api/doses/new/`,
                    headers: {
                        "X-CSRFToken": this.props.token,
                        "Content-Type": "multipart/form-data"
                    }
                };

                axios(config).then(resp => {
                    console.log(resp.data);
                }).catch(err => {console.error(err)})
            }
        })
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <Text style={styles.header}>Add Dose</Text>
                    <View style={styles.input}>
                        <TextInput label="Product name/Manufacturer" onChangeText={text => this.onChangeText("product", text)} mode="outlined" autoCompleteType="off" error={"product" in this.state.errors} />
                        {/* 
                        //@ts-ignore */}
                        {"product" in this.state.errors && this.state.errors["product"].map((errorMessage: string, index: Key) => <Text key={index} style={styles.error}>{errorMessage}</Text>)}
                        <TextInput label="Date (MM/DD/YYYY)" onChangeText={this.parseDate} mode="outlined" autoCompleteType="off" error={"date" in this.state.errors} />
                        {/* 
                        //@ts-ignore */}
                        {"date" in this.state.errors && this.state.errors["date"].map((errorMessage: string, index: Key) => <Text key={index} style={styles.error}>{errorMessage}</Text>)}
                        <TextInput label="Clinic name" onChangeText={text => this.onChangeText("clinic", text)} mode="outlined" autoCompleteType="off" error={"clinic" in this.state.errors} />
                        {/* 
                        //@ts-ignore */}
                        {"clinic" in this.state.errors && this.state.errors["clinic"].map((errorMessage: string, index: Key) => <Text key={index} style={styles.error}>{errorMessage}</Text>)}

                        <Button mode="contained" icon="card-plus" style={styles.submit} onPress={this.onSubmit} >Log In</Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default NewDose;