import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getAuth, deleteUser, signOut } from 'firebase/auth';
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
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/img/logo_afc.png')}
                style={{ width: 160, height: 180 }}
                resizeMode="contain"
            />
            <Text style={styles.message}>Seu cadastro foi recusado pela comissão organizadora.</Text>

            <TouchableOpacity
                onPress={delete_user}
            >
                <Text>Tentar novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={handleSignout}
            >
                <Text>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8C1F28',
        paddingHorizontal: 24,
        flexDirection: 'column'
    },
    message: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18
    }
})
