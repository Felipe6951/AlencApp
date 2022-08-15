import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
