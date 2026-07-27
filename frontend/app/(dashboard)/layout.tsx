import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'


const DashboardLayout = () => {
  return (
    <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 100
            }
          }}
        >
          <Tabs.Screen 
            name='home'
        />
    </Tabs>
  )
}

export default DashboardLayout