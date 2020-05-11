import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/screens/home';
import Search from './app/screens/search';
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <NavigationContainer >
      <Tab.Navigator 
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          tabStyle:{ 
            justifyContent: 'center', 
          }
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;