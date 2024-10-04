import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './src/screens/Home';
import { NewTask } from './src/screens/newTask';
import { EditTask } from './src/screens/EditTask';
// import Details from './src/screens/Details';
import TaskProvider from './src/context/TaskContext';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NewTask" component={NewTask} />          
          <Stack.Screen name="EditTask" component={EditTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}