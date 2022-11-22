import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Input } from 'native-base';

export default function CodeQR() {
    const [input, setInput] = useState('');
    const [qrValue, setQrValue] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={1}>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View>
                    <QRCode
                        value={qrValue ? qrValue : 'NA'}
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
                    <Input
                        onChangeText={(text) => setInput(text)}
                        value={input}
                        placeholder='Digite o valor do QRcode'
                        variant="outline"
                        backgroundColor={'#F2F2F2'}
                        placeholderTextColor={'#888888'}
                        fontSize={15}
                    />
                    <TouchableOpacity
                        style={styles.btnCreate}
                        onPress={() => {
                            Keyboard.dismiss();  
                            setQrValue(input);
                            setInput('');
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