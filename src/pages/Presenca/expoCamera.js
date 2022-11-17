import { async } from '@firebase/util';
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            requestPermission(status === 'granted')
        })();
    }, []);

    if (permission === false) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar />
                <Text>Sem acesso à câmara.</Text>
            </SafeAreaView>
        );
    }

    if (permission === null) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar />
                <Text>Pedido de autorização de câmara.</Text>
            </SafeAreaView>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

   
    return (
        <View style={styles.container}>
            <Camera type={type} style={{ height: 400, width: 300 }} flashMode={Camera.Constants.FlashMode.on} />
            <View>
                <TouchableOpacity onPress={toggleCameraType}>
                    <Text>Flip Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={null}>
                    <Text>light Camera</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
})