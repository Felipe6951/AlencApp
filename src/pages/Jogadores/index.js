import React, { cloneElement } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

export default function Jogadores() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxAtivos}>
        <View style={styles.boxRed}>
          <Text style={styles.boxRedTitle}>Ativos</Text>
        </View>
        <View style={styles.boxWhite}>
          <View style={styles.boxJogador}>
            <Text style={styles.user}>root@admin</Text>
            <View style={styles.info}>
              <Text style={styles.email}>root@gmail.com</Text>
              <Text style={styles.phone} >(84) 2042-4435</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.inativo}>Inativo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.boxInativos}>
        <View style={styles.boxRed}>
          <Text style={styles.boxRedTitle}>Inativos</Text>
        </View>
        <View style={styles.boxWhite}>
          <View style={styles.boxJogador}>
            <Text style={styles.user}>root@admin</Text>
            <View style={styles.info}>
              <Text style={styles.email}>root@gmail.com</Text>
              <Text style={styles.phone} >(84) 2042-4435</Text>
            </View>
            <View style={styles.info}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.ativo}>Ativo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.excluir}>Excluir</Text>
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
  boxInativos: {
    elevation: 5,
    shadowColor: '#000000',
    marginTop: 24
  },
  boxJogador: {
    marginTop: 20,
    marginLeft: 16,
  },
  user: {
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
  inativo: {
    color: '#ffffff',
    marginVertical: 2,
    marginLeft: 30
  },
  ativo: {
    color: '#ffffff',
    marginVertical: 2,
    marginLeft: 38
  },
  excluir:{
    color: '#ffffff',
    marginVertical: 2,
    marginLeft: 34
  },
  line: {
    borderBottomColor: '#BBBBBB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 280,
    marginLeft: 16,
    marginTop: 24
  }
});