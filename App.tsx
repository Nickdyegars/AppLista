import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './src/screens/Home';
import { NewTask } from './src/screens/newTask';
// import Details from './src/screens/Details';
import TaskProvider from './src/context/TaskContext';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='NewTask' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="NewTask" component={NewTask} />
          {/* <Stack.Screen name="Details" component={Details} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}