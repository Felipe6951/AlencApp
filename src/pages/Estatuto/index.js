import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as OpenAnything from 'react-native-openanything';
import DATA from '../Auxiliar/dataEstatuto'

export default function Estatuto() {

  const Item = ({ year, url }) => (
    <View style={{ height: 136, width: 312, elevation: 5, shadowColor: '#000000', backgroundColor: '#FFFFFF', marginHorizontal: 24, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 16, marginBottom: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Entypo name="book" size={20} color="#C0212E" style={{ marginRight: 8 }} />
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Estatuto - AFC</Text>
          <Text style={{ fontSize: 15, color: '#505050' }}>{year}</Text>
        </View>
      </View>

      <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center', marginBottom: 8 }} />

      <View style={{ alignSelf: 'center' }}>
        <TouchableOpacity
          style={{ backgroundColor: '#C0212E', width: 272, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 8 }}
          onPress={() => OpenAnything.Pdf(url)}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Visualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#F1F1F1', height: '100%' }}>
      <FlatList
        ListHeaderComponent={
          <View style={{ marginBottom: 24 }}>
            <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Entypo name="book" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
              </View>

              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{DATA.length}</Text>
              </View>
            </View>

            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: 24, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
              <Text style={{ color: '#505050', fontSize: 12 }}>Estatutos internos do Alencar Futebol Clube (AFC)</Text>
            </View>
          </View>
        }
        data={DATA}
        renderItem={({ item }) => <Item year={item.year} url={item.url} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
