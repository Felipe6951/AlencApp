import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import Presenca from '../pages/Presenca'
import Perfil from '../pages/Perfil'
import Avisos from '../pages/Avisos'
import Estatuto from '../pages/Estatuto'
import Jogadores from '../pages/Jogadores'
import Solicitacoes from '../pages/Solicitacoes'
import Organizadores from '../pages/Organizadores'


const { Screen, Navigator } = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Navigator>
    <Screen 
      name="AlencApp" 
      component={Home}
      options={{
        drawerLabel: 'Início'
      }}
    />
    <Screen 
      name="Perfil" 
      component={Perfil} 
    />
    <Screen 
      name="Presenca" 
      component={Presenca} 
      options={{
        drawerLabel: 'Presenças'
      }}
    />
    <Screen 
      name="Jogadores" 
      component={Jogadores} 
    />
    <Screen 
      name="Solicitacoes" 
      component={Solicitacoes} 
      options={{
        drawerLabel: 'Solicitações'
      }}
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