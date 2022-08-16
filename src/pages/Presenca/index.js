import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Ícones: https://www.npmjs.com/package/react-native-vector-icons

export default function Presenca() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.boxRed}>
          <Text style={styles.boxRedTitle}>Presente!</Text>
        </View>
        <View style={styles.boxWhite}>
          <TouchableOpacity style={styles.buttonMargin} >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.buttonTitle}>Check-in</Text>
              <Icon name="qrcode" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.boxRed}>
          <Text style={styles.boxRedTitle}>Escalação</Text>
        </View>
        <View style={{ backgroundColor: "#FFFFFF", width: 312, height: 150, borderBottomLeftRadius: 3, borderBottomRightRadius: 3, padding: 16 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Time 1</Text>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#505050', marginRight: 16 }}>Jogador 1</Text>
                <Text style={{ color: '#505050' }}>Tampa 1</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#505050', marginRight: 16 }}>Jogador 1</Text>
                <Text style={{ color: '#505050' }}>Tampa 1</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#505050', marginRight: 16 }}>Jogador 1</Text>
                <Text style={{ color: '#505050' }}>Tampa 1</Text>
              </View>
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.boxRed}>
          <Text style={styles.boxRedTitle}>Histórico de presenças</Text>
        </View>
        <View style={styles.boxWhite}>
          <TouchableOpacity style={styles.buttonMargin} onPress={() => Alert.alert('Histórico de partidas, aqui deve ficar um modal')}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.buttonTitle}>Ver histórico</Text>
              <Icon name="history" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
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
    height: 72,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    elevation: 5,
    shadowColor: '#000000',
    marginTop: 24
  },
  button: {
    backgroundColor: '#D93B48',
    width: 160,
    height: 40,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  buttonMargin: {
    margin: 16,
    backgroundColor: '#D93B48',
    width: 192,
    height: 40,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: "#FFFFFF",
    marginRight: 8
  },
  line: {
    borderBottomColor: '#BBBBBB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 280,
    marginTop: 24
  }
});