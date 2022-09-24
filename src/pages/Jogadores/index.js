import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import DATA from '../Auxiliar/dataJogadores';

export default function Jogadores() {

  const Item = ({ name, tampa, camisa }) => (
    <TouchableOpacity
      onPress={() => Alert.alert('Jogador: ' + name + " | Tampa: " + tampa + " | Camisa " + camisa)}
      style={{ width: 312, alignSelf: 'center', height: 104, marginTop: 16, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#505050', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <FontAwesome name="user-circle" size={24} color="#C0212E" style={{ marginRight: 4 }} />
        <View style={{ marginLeft: 4 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Jogador</Text>
          <Text style={{ fontSize: 15, color: '#505050' }}>{name}</Text>
        </View>

      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center', marginBottom: 8 }} />
      <View style={{ flexDirection: 'row', marginLeft: 4 }}>
        <Text style={{ marginRight: 20, color: '#505050' }}>Camisa {camisa}</Text>
        <Text style={{ color: '#505050' }}>Tampa: {tampa}</Text>
      </View>
    </TouchableOpacity>
  );

  const [searchPlayer, setSearchPlayer] = useState('');
  const [list, setList] = useState(DATA);

  useEffect(() => {
    if (searchPlayer === '') {
      setList(DATA);
    } else {
      setList(
        DATA.filter(item => {
          if (item.name.toLowerCase().indexOf(searchPlayer.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [searchPlayer]);


  return (
    <SafeAreaView style={{ backgroundColor: '#F1F1F1' }}>
      <FlatList
        ListHeaderComponent={
          <View >
            <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="filter" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
              </View>

              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{DATA.length}</Text>
              </View>
            </View>

            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: 24, paddingHorizontal: 16, alignItems: 'center', paddingVertical: 12 }}>
              <Text style={{ color: '#505050', fontSize: 12, marginBottom: 16 }}>Busque os jogadores pelo nome, tampa, ou número da camisa.</Text>
              <Input
                placeholder="Buscar..."
                fontSize={15}
                variant="outline"
                value={searchPlayer}
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                height={10}
                onChangeText={(t) => setSearchPlayer(t)}
                InputLeftElement={
                  <AntDesign name="search1" size={18} color="#585858" style={{ marginLeft: 8 }} />
                }
                InputRightElement={
                  <TouchableOpacity
                  onPress={() => setSearchPlayer('')}
                  >
                    <MaterialIcons name="highlight-remove" size={20} color="#585858" style={{ marginRight: 8 }} />
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
        }
        data={list}
        renderItem={({ item }) => <Item name={item.name} tampa={item.tampa} camisa={item.camisa} />}
        keyExtractor={item => item.id}
      />


    </SafeAreaView>
  );
}
