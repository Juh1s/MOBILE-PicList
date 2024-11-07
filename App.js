import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Camera from './screens/Camera';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({  
          tabBarIcon: ({ focused, color, size }) => { 
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Camera') {
              iconName = 'camera';
            }

            return <Ionicons name={iconName} size={size} color={color} />; 
          },
        })}
      >
        <Tab.Screen name='Camera' component={Camera} />
        <Tab.Screen name='Home' component={Home} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}