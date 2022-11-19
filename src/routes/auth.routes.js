import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Auxiliar/admin';
import NewOrganizer from '../pages/Organizadores/NewOrganizer';
import Geral from '../pages/Auxiliar/geral';
import Espera from '../pages/Espera';
import Recusado from '../pages/Recusado';
import Scanner from '../pages/Presenca/scanner';

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

      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Geral"
        component={Geral}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Espera"
        component={Espera}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Recusado"
        component={Recusado}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NewOrganizer"
        component={NewOrganizer}
        options={() => ({
          title: 'Novo organizador',
          headerStyle: {
            backgroundColor: '#8C1F28',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontSize: 18
          },
          headerTintColor: '#FFFFFF'
        })
        }
      />

      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={() => ({
          title: 'Scanner',
          headerStyle: {
            backgroundColor: '#8C1F28',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontSize: 18
          },
          headerTintColor: '#FFFFFF'
        })
        }
      />

    </Stack.Navigator>
  );
}