import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, StatusBar, Alert, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, serverTimestamp, setDoc, doc, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { Camera } from 'expo-camera';

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null); // Permissão de acesso a câmera
    const [scanned, setScanned] = useState(false); // Verifica se o valor já foi escaneado, estado = false > não foi escaneado
    const [qrValue, setQrValue] = useState('') // Recebe valor do QRcode
    const [usuario, setUser] = useState([]); // Recebe informações do banco referentes ao usuário
    const navigation = useNavigation() // Navegação

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    const q = query(collection(firestore, "membros"), where("email", "==", auth.currentUser.email));
    const dbRef = collection(firestore, "historic")

    function created() {
        var day = new Date().getDate();
        var month = (new Date().getMonth() + 1);
        var year = new Date().getFullYear();

        var date = (day + "/" + month + "/" + year);

        return date;
    }

    useEffect(() => { // Novos dados no banco
        onSnapshot(q, (querySnapshot) => {
            const members = [];
            querySnapshot.forEach((doc) => {
                members.push(doc.data().user);
                members.push(doc.data().tampa);
                members.push(doc.data().camisa);
                members.push(doc.data().name);
            })

            setUser(members);
        });
    }, []);

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
        setQrValue(`${data}`);
    };

    // Se o usuário não responder a permissão de acesso a câmera, a tela retorna a mensagem "Pedido de autorização de câmara."
    if (hasPermission === null) {
        return (
            <SafeAreaView style={styles.containerZero}>
                <Image
                    source={require('../../assets/img/logo_afc.png')}
                    style={{ width: 160, height: 180 }}
                    resizeMode="contain"
                />
                <Text style={styles.message}>Permissão de uso de câmera solicitada.</Text>
            </SafeAreaView>
        );
    }

    // Se o usuário recusar a permissão de acesso a câmera, a tela retorna a mensagem "Sem acesso à câmara."
    if (hasPermission === false) {
        return (
            <SafeAreaView style={styles.containerZero}>
                <Image
                    source={require('../../assets/img/logo_afc.png')}
                    style={{ width: 160, height: 180 }}
                    resizeMode="contain"
                />
                <Text style={styles.message}>Permissão de acesso a câmera negada.</Text>
            </SafeAreaView>
        );
    }

    // Verifica se o QR Code foi lido. Caso seja VERDADEIRO (leu), ele encaminha o usuário para a tela de presença
    if (scanned == true) {
        if (qrValue === created()) {
            // Função de presença => chamada para enviar ao banco os jogadores presentes
            const data = {
                name: usuario[3],
                day: created()
            }

            addDoc(dbRef, data)
            .then(docRef => {
                console.log("criou");
            })
            .catch(error => {
                console.log(error);
            })

            setDoc(doc(firestore, "presence", usuario[3]), {
                name: usuario[3],
                user: usuario[0],
                camisa: usuario[2],
                tampa: usuario[1],
                created_at: serverTimestamp(),
                day: created()
            })
                .then(() => {
                    Alert.alert(
                        "Presença",
                        "Sua presença foi confirmada!",
                        [{ text: "FECHAR", onPress: () => console.log("OK Pressed") }]
                    )
                })
                .catch(error => {
                    Alert.alert(
                        "Erro!",
                        "Algo deu errado na sua presença.",
                        [{ text: "FECHAR", onPress: () => console.log("OK Pressed") }]
                    )
                })
            navigation.navigate('Presenças')
        }
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
    },
    containerZero: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 24,
        flexDirection: 'column',
        height: '100%'
    },
    message: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 18
    }
})

