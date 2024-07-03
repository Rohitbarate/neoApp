import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Statistics from './Statistics';
import {BarChart3, House, User} from 'lucide-react-native';

const RootNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="statistics"
      screenOptions={{
        headerStyle: {backgroundColor: '#6f86d6'},
        headerShadowVisible: false,
        headerTitleStyle: {
          color: '#fff',
          textTransform: 'capitalize',
          fontWeight: '800',
          fontSize: 24,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: (props: {
            focused: boolean;
            color: string;
            size: number;
          }) => <House color={props.color} size={props.size} />,
        }}
        component={Home}
        name="home"
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props: {
            focused: boolean;
            color: string;
            size: number;
          }) => <User color={props.color} size={props.size} />,
        }}
        component={Profile}
        name="profile"
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props: {
            focused: boolean;
            color: string;
            size: number;
          }) => <BarChart3 color={props.color} size={props.size} />,
        }}
        component={Statistics}
        name="statistics"
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
