import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigations/StackNavigator";
import TabNavigator from "./navigations/TabNavigator";

const App = () => {
  const isAuthenticated = false;
  return (
    <NavigationContainer>
        {
            isAuthenticated ? <TabNavigator /> : <StackNavigator />
        }
    </NavigationContainer>
  );
};

export default App;