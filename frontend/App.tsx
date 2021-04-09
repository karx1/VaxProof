import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { API_URL } from "./constants";

import Home from "./screens/Home";

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
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
