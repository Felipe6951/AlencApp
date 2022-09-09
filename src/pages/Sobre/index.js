import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';

export default function Sobre() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'F1F1F1'}}>
      <View style={{ alignSelf: 'center', marginTop: 10 }}>
        <Image
          style={{ width: 180, height: 210 }}
          source={require('../../assets/img/logo_afc.png')}
        />
      </View>
      <View style={{ alignSelf: 'center', marginHorizontal: 24, alignItems: 'center' }}>
        <Text style={{ color: '#505050' }}>©AlencApp - Todos os direitos reservados.</Text>
        <Text style={{ color: '#505050' }}>Desenvolvido por Felipe Freitas, Vinícius Fernandes, Irlan Moreira e Maikon Maia.</Text>
        <Text style={{ color: '#505050' }}>Alencar Futebol Clube (A.F.C.)</Text>
        <Text style={{ color: '#505050' }}>@Versão 201910940100</Text>
      </View>
    </SafeAreaView >
  );
}