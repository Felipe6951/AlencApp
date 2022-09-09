import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, ViewBase } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import Presenca from '../pages/Presenca'
import Perfil from '../pages/Perfil'
import Avisos from '../pages/Avisos'
import Estatuto from '../pages/Estatuto'
import Jogadores from '../pages/Jogadores'
import Solicitacoes from '../pages/Solicitacoes'
import Organizadores from '../pages/Organizadores'

import { CustomDrawer } from '../components/customDrawer';

const { Screen, Navigator } = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Screen
        name="AlencApp"
        component={Home}
        options={({ navigation }) => ({
          title: 'AlencApp',
          headerStyle: {
            backgroundColor: '#8C1F28',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontSize: 18
          },
          headerTitleAlign: "center",
        })}
      />
      <Screen
        name="Perfil"
        component={Perfil}
      />
      <Screen
        name="Presenças"
        component={Presenca}
      />
      <Screen
        name="Jogadores"
        component={Jogadores}
      />
      <Screen
        name="Solicitações"
        component={Solicitacoes}
      />
      <Screen
        name="Avisos"
        component={Avisos}
      />
      <Screen
        name="Organizadores"
        component={Organizadores}
      />
      <Screen
        name="Estatuto"
        component={Estatuto}
      />
      <Screen
        name="Sobre"
        component={Sobre}
      />
    </Navigator>
  );
}