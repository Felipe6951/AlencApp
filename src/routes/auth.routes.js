import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login'
import Register from '../pages/Register';

const Stack = createNativeStackNavigator();

export default function Authroutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}