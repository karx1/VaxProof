import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DrawerStackParamList from "./types";

function HomeScreen({ navigation }: DrawerScreenProps<DrawerStackParamList, "Home">) {
  return (
    <View style={styles.container}>
      <Text>Welcome home!</Text>
      <Button onPress={() => navigation.navigate("Notifications")} title="Go to notifs" />
    </View>
  )
}

function NotificationsScreen({ navigation }: DrawerScreenProps<DrawerStackParamList, "Notifications">) {
  return (
    <View style={styles.container}>
      <Text>No notifs at the moment</Text>
      <Button onPress={() => navigation.navigate("Home")} title="Go back home" />
    </View>
  )
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
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
