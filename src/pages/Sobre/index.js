import React from 'react';
import { View, Text, SafeAreaView, Image, StatusBar, ScrollView } from 'react-native';
import typography from '../../styles/typography';
import styles from './styles'

export default function Sobre() {
  return (
    <SafeAreaView style={styles.back}>
      <StatusBar />

      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.imgPosition}>
          <Image style={styles.img} source={require('../../assets/img/logo_afc.png')} />
        </View>

        <View style={styles.informationContent}>
          <Text style={styles.informationAbout}>©AlencApp - Todos os direitos reservados.</Text>
          <Text style={styles.informationAbout}>Desenvolvido por Felipe Freitas, Vinícius Fernandes, Irlan Moreira e Maikon Maia.</Text>
          <Text style={styles.informationAbout}>Alencar Futebol Clube (A.F.C.)</Text>
          <Text style={styles.informationAbout}>@Versão 1.0.0</Text>
        </View>
      </ScrollView>

    </SafeAreaView >
  );
}