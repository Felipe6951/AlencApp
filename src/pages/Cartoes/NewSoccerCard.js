import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { Input, FormControl } from 'native-base';

import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp, setDoc, doc, collection } from 'firebase/firestore';
import { firebaseConfig } from '../../../firebase-config';

export default function NewSoccerCard() {

    const [cardYellow, setCardYellow] = useState('');
    const [cardRed, setCardRed] = useState('');

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    function created() {
        var day = new Date().getDate();
        var month = (new Date().getMonth() + 1);
        var year = new Date().getFullYear();
        var date = (day + "/" + month + "/" + year);
        return date;
    }

    const createCard = () => {
        if (cardYellow === '' && cardRed === '') {
            Alert.alert('ERROR', 'Preencha todos os campos.')
        } else {
            setDoc(doc(firestore, "cartoes", created()), {
                cardYellow: cardYellow,
                cardRed: cardRed,
                created: created(),
                stamp: serverTimestamp()
            })
                .then(() => {
                    Alert.alert("Cartões", "Cartões registrados com sucesso!", [{ text: 'FECHAR' }]);
                    setCardRed('');
                    setCardYellow('');
                })
                .catch((error) => {
                    Alert.alert(error)
                })
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FAFAFA', paddingBottom: "100%" }}>
            <View>
                <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '5%', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="cards" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Nova anotação</Text>
                    </View>
                </View>

                <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: '5%', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}>
                    <View style={{ marginBottom: 8 }}>
                        <FormControl.Label>Amarelo</FormControl.Label>
                        <Input
                            placeholder="Digite os jogadores advertidos..."
                            fontSize={15}
                            variant="outline"
                            backgroundColor={'#F2F2F2'}
                            value={cardYellow}
                            onChangeText={(text) => setCardYellow(text)}
                            placeholderTextColor={'#888888'}
                            multiline={true}
                            textAlignVertical={'top'}
                        />
                    </View>

                    <View>
                        <FormControl.Label>Vermelho</FormControl.Label>
                        <Input
                            placeholder="Digite os jogadores advertidos..."
                            fontSize={15}
                            variant="outline"
                            backgroundColor={'#F2F2F2'}
                            value={cardRed}
                            onChangeText={(text) => setCardRed(text)}
                            placeholderTextColor={'#888888'}
                            multiline={true}
                            textAlignVertical={'top'}
                        />
                    </View>

                    <View style={{ justifyContent: 'flex-end', marginRight: 8, marginTop: 16, flexDirection: 'row', marginBottom: 8 }}>
                        <TouchableOpacity
                            style={{ paddingTop: 8 }}
                            onPress={() => {
                                setCardRed('');
                                setCardYellow('');
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#C0212E', marginRight: 24 }}>LIMPAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ paddingHorizontal: 8, paddingTop: 8 }}
                            onPress={() => {
                                Keyboard.dismiss();
                                createCard();
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#C0212E' }}>CRIAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
}

