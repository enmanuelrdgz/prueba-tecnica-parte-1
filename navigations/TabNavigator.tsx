import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/HomeScreen";
import Cart from "../screens/CartScreen";
import Product from "../screens/ProductScreen";
import Profile from "../screens/ProfileScreen";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Home}
            />
            <HomeStack.Screen
                 name="Product"
                component={Product}
            />
        </HomeStack.Navigator>
    );
}

const CartStack = createNativeStackNavigator();

const CartStackScreen = () => {
    return (
        <CartStack.Navigator>
            <CartStack.Screen
                name="Cart"
                component={Cart}
            />
        </CartStack.Navigator>
    );
}

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={Profile}
            />
        </ProfileStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeStack"
                component={HomeStackScreen}
            />
            <Tab.Screen
                name="CartStack"
                component={CartStackScreen}
            />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStackScreen}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;