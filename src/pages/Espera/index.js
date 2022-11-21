import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getAuth, signOut } from 'firebase/auth';


export default function Espera() {
    
    const navigation = useNavigation();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const handleSignout = () => {
        signOut(auth).then(() => {
            navigation.navigate("Login")
          }).catch((error) => {
            Alert.alert(error)
          });
    }
    
    return (
        <View>
            <Text>Aguarde sua solicitação ser aceita</Text>
            <TouchableOpacity
            onPress={handleSignout}
            >
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

