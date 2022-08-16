import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

//seguir passos desse site: https://www.npmjs.com/package/@react-native-picker/picker

export default function Avisos() {
  const [motivos] = useState(['-------------------', 'Mudança de horário', 'Jogo Cancelado', 'Outro'])

  const [motivoSelecionado, setMotivoSelecionado] = useState([])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.boxRed}>
          <Text style={styles.boxRedTitle}>Novo aviso</Text>
        </View>
        <View style={styles.boxWhite}>
          <View style={styles.forms}>
            <View style={styles.formQuest}>
              <Text style={styles.formTitle}>Motivo</Text>
              <View style={styles.picker}>
                <Picker
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
                </Picker>
              </View>
            </View>
            <View style={styles.formQuest}>
              <Text style={styles.formTitle}>Descrição</Text>
              <View style={styles.inputDescricao}>
                <TextInput
                  style={styles.descricao}
                  placeholder='Descreva o aviso...'
                />
              </View>
            </View>
            <View style={styles.btns}>
              <TouchableOpacity>
                <Text style={styles.cancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.enviar}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    height: 304,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  box: {
    elevation: 5,
    shadowColor: '#000000',
    marginTop: 24,
  },
  picker: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D93B48'
  },
  pickerItem: {
    height: 32,
    paddingBottom: 48
  },
  forms: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16
  },
  formTitle: {
    fontSize: 15,
    marginBottom: 4
  },
  formQuest: {
    marginBottom: 16
  },
  inputDescricao: {
    borderWidth: 2,
    borderColor: '#D93B48',
    borderRadius: 12,
    height: 80,
    padding: 6
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 24,
    marginTop: 34
  },
  cancelar: {
    color: '#D93B48',
    fontWeight: 'bold',
    marginRight: 24,
  },
  enviar: {
    color: '#D93B48',
    fontWeight: 'bold',
  }
});