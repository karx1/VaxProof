import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginLeft: 3,
      marginRight: 3
    },
    header: {
      fontSize: 75,
      fontWeight: "bold",
    },
    input: {
      width: "75%",
      marginLeft: 10,
      marginRight: 10,
      flex: 1,
    },
    submit: {
      paddingVertical: 10,
      marginVertical: 10
    },
    error: {
      color: "red"
    },
    wrapper: {
      margin: "auto",
      padding: 20
    }
});

export default styles;