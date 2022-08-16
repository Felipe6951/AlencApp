import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import Presenca from '../pages/Presenca'

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
      name="Sobre" 
      component={Sobre} 
    />
    <Screen 
      name="Presenca" 
      component={Presenca} 
      options={{
        drawerLabel: 'Presenças'
      }}
    />
    </Navigator>
  );
}