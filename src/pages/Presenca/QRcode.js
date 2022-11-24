import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Input } from 'native-base';

export default function CodeQR() {
    const [qrValue, setQrValue] = useState('');

    function created() {
        var day = new Date().getDate();
        var month = (new Date().getMonth() + 1);
        var year = new Date().getFullYear();

        var date = (day + "/" + month + "/" + year);

        return date;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={1}>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View>
                    <QRCode
                        value={qrValue ? qrValue : 'Alencar Futebol Clube'}
                        size={310}
                        color="black"
                        backgroundColor="#FAFAFA"
                        logoSize={30}
                        logoMargin={2}
                        logoBorderRadius={15}
                        logoBackgroundColor="yellow"
                    />
                </View>

                <View style={styles.formContent}>
                    <TouchableOpacity
                        style={styles.btnCreate}
                        onPress={() => {
                            setQrValue(created());
                        }}
                    >
                        <Text style={styles.btnCreateText}>Gerar QR Code</Text>
                    </TouchableOpacity>
                </View>
                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Estilização dos componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FAFAFA',
        paddingHorizontal: '40%'
    },
    formContent: {
        marginTop: 24
    },
    btnCreate: {
        backgroundColor: '#C0212E',
        paddingHorizontal: 8,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16
    },
    btnCreateText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }


});