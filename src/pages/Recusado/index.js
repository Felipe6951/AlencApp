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

    TouchableOpacity.defaultProps = { activeOpacity: 0.9 };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/img/logo_afc.png')}
                style={{ width: 160, height: 180 }}
                resizeMode="contain"
            />
            <Text style={styles.message}>Sua conta foi recusada pela comissão organizadora.</Text>

            <TouchableOpacity
                style={[styles.btnLogout, styles.btnHigth]}
                onPress={delete_user}
            >
                <Text style={styles.txtBtnLogout}>Tentar novamente</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.btnLogout, styles.btnLow]}
                onPress={handleSignout}
            >
                <Text style={styles.txtBtnLogout}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8C1F28',
        paddingHorizontal: 24,
        flexDirection: 'column',
        height: '100%'
    },
    message: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18
    },
    btnLogout: {
        backgroundColor: '#FFFFFF',
        width: '120%',
        paddingHorizontal: 32,
        paddingVertical: 12,
        alignItems: 'center'
    },
    txtBtnLogout: {
        color: '#C0212E',
        fontWeight: '700',
        fontSize: 18
    },
    btnLow: {
        marginTop: 8
    },
    btnHigth: {
        marginTop: '100%'
    }
})
