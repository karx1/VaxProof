import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { API_URL } from "./constants";

const Drawer = createDrawerNavigator();

export default function App() {
  const [token, setToken] = React.useState("");

  useEffect(() => {
    axios.get(`${API_URL}/api/csrf-token?format=json`).then(resp => {
      setToken(resp.data);
    })
  }, []);

  return (
    <NavigationContainer>
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator> */}
      <View style={styles.container}>
        <Text>Hello world!</Text>
        <Text>The token is: </Text>
        <Text>{token}</Text>
      </View>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
