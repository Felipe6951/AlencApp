import React from 'react';

import { Avatar, ChevronRightIcon, CircleIcon, CheckCircleIcon, InfoOutlineIcon } from 'native-base';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.container}>
      
      <View style={styles.containerperfil}>
        <TouchableOpacity style={styles.perfilbtn}>
            <Avatar>Maikon</Avatar>
            <Text style={styles.textavatar}>Olá,{'\n'}Maikon <ChevronRightIcon /> </Text>
        </TouchableOpacity>
        
        <Text>Tampa</Text>
        <Text> <CircleIcon /> 2</Text>
        <TouchableOpacity style={styles.checkin}>
          <Text>Check-in <CheckCircleIcon /> </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text>Presença <CheckCircleIcon /> </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Estatuto <InfoOutlineIcon /> </Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  
  containerperfil:{
    flex:1,
    backgroundColor: '#FFFFFF'
  },

  perfilbtn:{
    flexDirection: 'row',
    paddingVertical: '4%',
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#BBBBBB',
  },

  textavatar:{
    paddingLeft: '3%'
  }
})