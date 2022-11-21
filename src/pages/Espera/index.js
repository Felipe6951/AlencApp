import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet, SafeAreaView, Image } from 'react-native';

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
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/img/logo_afc.png')}
                style={{ width: 160, height: 180 }}
                resizeMode="contain"
            />
            <Text style={styles.message}>Sua conta está sendo analisada pela comissão organizadora do Alencar Futebol Clube.</Text>
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
