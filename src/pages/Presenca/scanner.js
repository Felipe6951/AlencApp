import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, StatusBar, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
// import { Camera } from 'expo-camera';

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null); // Permissão de acesso a câmera
    const [scanned, setScanned] = useState(false); // Verifica se o valor já foi escaneado, estado = false > não foi escaneado
    const [value, setValue] = useState('') // Recebe valor do QRcode
    const navigation = useNavigation() // Navegação

    // Componente de botão para novo Scan
    const ScanAgain = () => (
        <TouchableOpacity
            style={styles.btnScanAgain} onPress={() => setScanned(false)}>
            <MaterialCommunityIcons name="restart" size={24} color="#FFFFFF" />
            <Text style={styles.btnScanAgainText}>REINICIAR SCAN</Text>
        </TouchableOpacity>
    );

    // Monitora a permissão de acesso a câmera
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    // Set novos valores para funcionamento do Scan.
    // setScanned(true) > Determina que o QRcode foi escaneado
    // setValue(`${data}`) > Guarda o valor do QRcode
    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setValue(`${data}`);
    };

    console.log(value)

    // Se o usuário não responder a permissão de acesso a câmera, a tela retorna a mensagem "Pedido de autorização de câmara."
    if (hasPermission === null) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar />
                <Text>Pedido de autorização de câmara.</Text>
            </SafeAreaView>
        );
    }

    // Se o usuário recusar a permissão de acesso a câmera, a tela retorna a mensagem "Sem acesso à câmara."
    if (hasPermission === false) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar />
                <Text>Sem acesso à câmara.</Text>
            </SafeAreaView>
        );
    }

    // Verifica se o QR Code foi lido. Caso seja VERDADEIRO (leu), ele encaminha o usuário para a tela de presença
    if (scanned == true){
        navigation.navigate('Presenças')
    }

    // Se o usuário ACEITAR a permissão de acesso a câmera, a tela retorna as funcionalidades adequadas
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />

            <View style={styles.barCodeBox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.camera}
                />
            </View>
            {/* <Text> {value} </Text> */}
            {scanned && <ScanAgain />}
        </SafeAreaView>
    );
};

// Estilização dos componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    value: {
        fontSize: 18,
        color: '#000000',
    },
    barCodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
    },
    btnScanAgain: {
        backgroundColor: '#C0212E',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        marginTop: 16
    },
    btnScanAgainText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginLeft: 6
    },
    camera: {
        width: 550,
        height: 550
    }
})