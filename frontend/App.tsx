import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Appbar, Provider as PaperProvider, Text, Button } from "react-native-paper";
import { API_URL } from "./constants";

import Home from "./screens/Home";
import styles from './styles';
import DrawerStackParamList from './types';

function CustomNavigationBar({ scene }: any) {
  return (
    <Appbar.Header>
      <Appbar.Content title="VaxProof" />
      <Appbar.Action icon="menu" onPress={scene.descriptor.navigation.openDrawer} />
    </Appbar.Header>
  )
}

type Props = DrawerScreenProps<DrawerStackParamList, "Notifications">;

function NotificationsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Home')}>Go back home</Button>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  const [token, setToken] = React.useState("");

  useEffect(() => {
    axios.get(`${API_URL}/api/csrf-token?format=json`).then(resp => {
      setToken(resp.data);
    })
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{
          header: CustomNavigationBar,
          headerShown: true
        }}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
