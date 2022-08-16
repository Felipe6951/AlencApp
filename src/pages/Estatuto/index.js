import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Ícones: https://www.npmjs.com/package/react-native-vector-icons

export default function Estatuto() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.boxRed}>
          <Text style={styles.boxRedTitle}>Dowloads</Text>
        </View>
        <View style={styles.boxWhite}>
          <TouchableOpacity style={styles.buttonMargin} >
            <Text style={styles.buttonTitle}>Estatuto AFC - 2022 <Icon name="download" size={20} color="#FFFFFF"/></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>Estatuto AFC - 2021 <Icon name="download" size={20} color="#FFFFFF" />
            </Text>
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
    height: 128,
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
    width: 192,
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
  }
});