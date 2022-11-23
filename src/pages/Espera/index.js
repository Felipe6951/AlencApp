import React from 'react';
import { Text, StyleSheet, SafeAreaView, Image, Alert, TouchableOpacity, View } from 'react-native';
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

    TouchableOpacity.defaultProps = { activeOpacity: 0.9 };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/img/logo_afc.png')}
                style={{ width: 160, height: 180 }}
                resizeMode="contain"
            />
            <Text style={styles.message}>Sua conta está sendo analisada pela comissão organizadora.</Text>

            <TouchableOpacity
                style={styles.btnLogout}
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
        alignItems: 'center',
        marginTop: '100%',
    },
    txtBtnLogout: {
        color: '#C0212E',
        fontWeight: '700',
        fontSize: 18
    }
})
