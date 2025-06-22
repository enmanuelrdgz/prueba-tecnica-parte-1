import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Login"}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={"Register"}
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;