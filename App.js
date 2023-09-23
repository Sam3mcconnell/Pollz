import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TodayPoll from "./screens/TodayPoll";
import YesterdayPoll from "./screens/YesterdayPoll";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="TodayPoll" component={TodayPoll} options={{tabBarStyle: {display: "none"}, headerShown: false}}/>
        <Tab.Screen name="YesterdayPoll" component={YesterdayPoll} options={{tabBarStyle: {display: "none"}, headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}


