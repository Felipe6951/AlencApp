import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getAuth, deleteUser } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Espera() {

    const navigation = useNavigation();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const user = auth.currentUser;

    const handleSignout = () => {
        signOut(auth).then(() => {
            navigation.navigate("Login")
          }).catch((error) => {
            Alert.alert(error)
          });
    }

    const delete_user = () => {
        deleteUser(user)
        .then(() => {
            navigation.navigate("Register")
        })
    }

    return (
        <View>
            <Text>A sua solicitaçãofoi recusada</Text>
            <TouchableOpacity 
            onPress={delete_user}>
                <Text>Clique aqui para poder tentar novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={handleSignout}
            >
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}