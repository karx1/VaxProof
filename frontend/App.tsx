import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Appbar, Provider as PaperProvider } from "react-native-paper";
import { api_url } from "./config.json";

import Home from "./screens/Home";
import Register from './screens/Register';
import Login from "./screens/Login";
import Logout from './screens/Logout';

function CustomNavigationBar({ scene }: any) {
  return (
    <Appbar.Header>
      <Appbar.Content title="VaxProof" />
      <Appbar.Action icon="menu" onPress={scene.descriptor.navigation.openDrawer} />
    </Appbar.Header>
  )
}

async function getAuthed(callback: Function) {
  const resp = await axios.get(`${api_url}/api/authed`);
  callback(resp.data);
}

const Drawer = createDrawerNavigator();

export default function App() {
  const [token, setToken] = React.useState("");
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    axios.get(`${api_url}/api/csrf-token?format=json`).then(resp => {
      setToken(resp.data);
      getAuthed((authed: boolean) => {
        setAuthed(authed);
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
          {!authed ?
            <>
              <Drawer.Screen name="Login">
                {(props) => <Login token={token} onLogin={() => getAuthed((authed: boolean) => setAuthed(authed))} {...props} />}
              </Drawer.Screen>
              <Drawer.Screen name="Register">
                {(props) => <Register token={token} {...props} />}
              </Drawer.Screen>
            </>
            : 
            <>
              <Drawer.Screen name="Logout">
                {(props) => <Logout onLogout={() => getAuthed((authed: boolean) => setAuthed(authed))} {...props} />}
              </Drawer.Screen>
            </>}
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
