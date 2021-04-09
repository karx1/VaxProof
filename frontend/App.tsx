import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Appbar, Provider as PaperProvider } from "react-native-paper";
import { API_URL } from "./constants";

import Home from "./screens/Home";
import Register from './screens/Register';

function CustomNavigationBar({ scene }: any) {
  return (
    <Appbar.Header>
      <Appbar.Content title="VaxProof" />
      <Appbar.Action icon="menu" onPress={scene.descriptor.navigation.openDrawer} />
    </Appbar.Header>
  )
}


const Drawer = createDrawerNavigator();

export default function App() {
  const [token, setToken] = React.useState("");
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/csrf-token?format=json`).then(resp => {
      setToken(resp.data);
      axios.get(`${API_URL}/api/authed`).then(resp => {
        setAuthed(resp.data);
      });
    });
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{
          header: CustomNavigationBar,
          headerShown: true
        }}>
          <Drawer.Screen name="Home">
            {(props) => <Home authed={authed} {...props} />}
          </Drawer.Screen>
          <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
