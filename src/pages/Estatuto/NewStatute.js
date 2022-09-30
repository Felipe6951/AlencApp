import React from "react";
import { View, Text, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { Ionicons, AntDesign, FontAwesome, Entypo, MaterialIcons, CheckIcon } from '@expo/vector-icons';
import { FormControl, Input } from "native-base";
import { useState } from "react";

export default function NewStatute() {

    const [year, setYear] = useState('')
    const [url, setUrl] = useState('')

    return (
        <SafeAreaView>
            <StatusBar />
            <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="book" size={21} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Criar estatuto</Text>
                </View>
            </View>

            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: 24, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }}>
                <View>
                    <FormControl.Label>Ano do estatuto</FormControl.Label>
                    <Input
                        placeholder="Ano referente ao estatuto"
                        fontSize={15}
                        variant="outline"
                        backgroundColor={'#F2F2F2'}
                        placeholderTextColor={'#888888'}
                        multiline={false}
                        keyboardType='numeric'
                        value={year}
                        onChangeText={(text) => setYear(text)}
                    />
                </View>

                <View style={{ marginBottom: 8 }}>
                    <FormControl.Label>Link de acesso</FormControl.Label>
                    <Input
                        placeholder="Insira a URL do documento"
                        fontSize={15}
                        variant="outline"
                        backgroundColor={'#F2F2F2'}
                        placeholderTextColor={'#888888'}
                        multiline={false}
                        keyboardType='url'
                        value={url}
                        onChangeText={(text) => setUrl(text)}
                    />
                </View>

                <View style={{ justifyContent: 'flex-end', marginRight: 16, marginTop: 24, flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setYear('')
                            setUrl('')
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#C0212E', marginRight: 24 }}>Limpar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Alert.alert('Enviou!')}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#C0212E' }}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}