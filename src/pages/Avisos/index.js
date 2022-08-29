import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, AntDesign, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { Input } from 'native-base';


//seguir passos desse site: https://www.npmjs.com/package/@react-native-picker/picker
//https://www.npmjs.com/package/@react-native-community/picker

export default function Avisos() {
  const [motivos] = useState(['-------------------', 'Mudança de horário', 'Jogo Cancelado', 'Outro'])

  const [motivoSelecionado, setMotivoSelecionado] = useState([])
  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <View>
        <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="alert-circle" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Novo aviso</Text>
          </View>
        </View>

        <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: 24, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
          <View style={{ borderWidth: 1, borderRadius: 8, borderColor: '#C0212E' }}>
            <Picker
              style={{ marginVertical: -5, marginLeft: 4 }}
              selectedValue={motivoSelecionado}
              onValueChange={(itemValue) =>
                setMotivoSelecionado(itemValue)
              }>
              {
                motivos.map(cr => {
                  return <Picker.Item label={cr} value={cr} />
                })
              }
            </Picker>
          </View>

          <View style={{ marginTop: 16, borderWidth: 1, borderRadius: 8, borderColor: '#C0212E', paddingHorizontal: 16, paddingVertical: 8, height: 80 }}>
            <TextInput
              multiline={true}
              placeholder='Descreva seu motivo...'
            />
          </View>

          <View style={{ justifyContent: 'flex-end', marginRight: 16, marginTop: 24, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => Alert.alert('Limpou!')}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#C0212E', marginRight: 16 }}>Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Alert.alert('Enviou!')}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#C0212E' }}>Enviar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

/* <SafeAreaView>
<View>
  <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="alert-circle" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
      <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Novo aviso</Text>
    </View>
  </View>

  <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: 24, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
    <Text style={{ color: '#505050', fontSize: 12 }}>Estatutos internos do Alencar Futebol Clube (AFC)</Text>
  </View>
</View>
</SafeAreaView> */

/* <Picker
  style={styles.pickerItem}
  selectedValue={motivoSelecionado}
  onValueChange={(itemValue) =>
    setMotivoSelecionado(itemValue)
  }>
  {
    motivos.map(cr => {
      return <Picker.Item label={cr} value={cr} />
    })
  }
</Picker> */