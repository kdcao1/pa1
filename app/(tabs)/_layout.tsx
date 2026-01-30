import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import "../../global.css"

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
                backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#25292e',
            },
        }}
>
      <Tabs.Screen name="index" options={{ 
        title: 'Home',
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }} />
        <Tabs.Screen name="notes" options={{ 
        title: 'Notes',
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'document-text-sharp' : 'document-text-outline'} color={color} size={24} />
          ),
        }} />
      <Tabs.Screen name="user" options={{ 
        title: 'Current User' ,
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }} />
    </Tabs>
  );
}
