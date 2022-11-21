import React from 'react';
import { Text, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function Espera() {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/img/logo_afc.png')}
                style={{ width: 160, height: 180 }}
                resizeMode="contain"
            />
            <Text style={styles.message}>Sua conta está sendo analisada pela comissão organizadora do Alencar Futebol Clube.</Text>
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
