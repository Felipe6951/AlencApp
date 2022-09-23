import React from 'react';
import { NavigationContainer } from '@react-navigation/native'

import Authroutes from './auth.routes';

export default function Routes() {
  return (
    <NavigationContainer>
      <Authroutes />
    </NavigationContainer>
  );
}