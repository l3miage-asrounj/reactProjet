import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import Detail from '../components/Detail';
import Favorites from '../components/Favorites';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddRecette from '../components/AddRecette';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: 'Accueil' }} />
      <Stack.Screen name="Detail" component={Detail} options={{ title: 'Détail de la recette',  }} />
    </Stack.Navigator>
  );
};

const FavoriteStack = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Les recettes favorites'}} />
      <Stack.Screen name="Detail" component={Detail} options={{ title: 'Les recettes favorites'}} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{ title: 'Accueil',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="ios-home" color={color} size={size} />
      ),}} />
      
        <Tab.Screen
        name="FavoriteStack"
        component={FavoriteStack} 
        options={{ title: 'favorites',
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-heart" color={color} size={size} />
        ),
        }} />

        <Tab.Screen 
        name="AddRecette" 
        component={AddRecette}
        options={{ title: 'ajouter',
         tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-add" color={color} size={size} />
        ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
