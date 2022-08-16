import React, { cloneElement } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

export default function Solicitacoes() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.boxRed}>
          <Text style={styles.boxRedTitle}>Cadastro</Text>
        </View>
        <View style={styles.boxWhite}>
          <View style={styles.boxJogador}>
            <Text style={styles.nome}>Gustavo Emanuel Silva Queiroz</Text>
            <View style={styles.info}>
              <Text style={styles.email}>gustavo@gmail.com</Text>
              <Text style={styles.phone} >(84) 2253-8278</Text>
            </View>
            <View style={styles.info}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.recusar}>Recusar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.aceitar}>Aceitar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 72,
    backgroundColor: '#F2F2F2'
  },
  logo: {
    width: 250,
    resizeMode: 'contain'
  },
  boxRed: {
    backgroundColor: '#8C1F28',
    width: 312,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  boxRedTitle: {
    color: '#FFFFFF',
    paddingLeft: 16,
    fontSize: 15,
  },
  boxWhite: {
    backgroundColor: "#FFFFFF",
    width: 312,
    height: 128,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  boxAtivos: {
    elevation: 5,
    shadowColor: '#000000',
    marginTop: 24
  },
  box: {
    elevation: 5,
    shadowColor: '#000000',
    marginTop: 24
  },
  boxJogador: {
    marginTop: 20,
    marginLeft: 16,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 15
  },
  email: {
    fontSize: 15,
    color: '#505050'
  },
  phone: {
    fontSize: 15,
    color: '#505050'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280
  },
  btn: {
    backgroundColor: '#D93B48',
    width: 105,
    height: 24,
    borderRadius: 3,
    marginTop: 12
  },
  recusar: {
    color: '#ffffff',
    marginVertical: 2,
    marginLeft: 28

  },
  aceitar:{
    color: '#ffffff',
    marginVertical: 2,
    marginLeft: 30
  },
  line: {
    borderBottomColor: '#BBBBBB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 280,
    marginLeft: 16,
    marginTop: 24
  }
});