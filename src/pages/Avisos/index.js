import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, AntDesign, FontAwesome, Entypo, MaterialIcons, CheckIcon } from '@expo/vector-icons';
import { Input, FormControl, Select } from 'native-base';


//seguir passos desse site: https://www.npmjs.com/package/@react-native-picker/picker
//https://www.npmjs.com/package/@react-native-community/picker

//
//
//
//
//
//
//
//PROBLEMA NO SELECT MOTIVOS
//
//
//
//
//
//
//
//
//

export default function Avisos() {
  const [motive] = React.useState(['Mudança de horário', 'Jogo cancelado', 'Outro'])
  const [motiveSelected, setMotiveSelected] = React.useState([])

  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={{ backgroundColor: '#F1F1F1', height: '100%' }}>
      <View>
        <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="alert-circle" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Novo aviso</Text>
          </View>
        </View>

        <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: 24, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
          <View>
            <FormControl.Label>Motivo</FormControl.Label>
            <Select
              selectedValue={motiveSelected}
              accessibilityLabel="Selecione o motivo"
              placeholder="Selecione o motivo"
              _selectedItem={{
                bg: "#C0212E",
                endIcon: <CheckIcon size="5" color="#FFFFFF" />,
              }}
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
              fontSize={15}
              onValueChange={(itemValue) =>
                setMotiveSelected(itemValue)
              }>
              {
                motive.map(cr => {
                  return <Select.Item label={cr} value={cr} />
                })
              }
            </Select>
          </View>

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Descrição</FormControl.Label>
            <Input
              placeholder="Descreva o aviso..."
              fontSize={15}
              variant="outline"
              backgroundColor={'#F2F2F2'}
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholderTextColor={'#888888'}
              multiline={true}
              height={20}
              textAlignVertical={'top'}
            />
          </View>

          <View style={{ justifyContent: 'flex-end', marginRight: 16, marginTop: 24, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                setDescription('')
                setMotiveSelected('')
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#C0212E', marginRight: 24 }}>Limpar</Text>
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