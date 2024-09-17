import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Buscar',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saves"
        options={{
          title: 'Receitas Salvas',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
