import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, ListRenderItemInfo } from 'react-native';
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'One Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Two Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Three Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Four Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Five Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Six Item',
  },
];

const Item = ({ title }) => (
  <View style={{ width: 312, alignSelf: 'center', height: 104, marginTop: 16, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#505050', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 8 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <FontAwesome name="user-circle" size={24} color="#C0212E" style={{ marginRight: 4 }} />
      <View style={{ marginLeft: 4 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Organizador</Text>
        <Text style={{ fontSize: 15, color: '#505050' }}>{title}</Text>
      </View>

    </View>
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center', marginBottom: 8 }} />
    <View style={{ flexDirection: 'row', marginLeft: 4 }}>
      <Text style={{ marginRight: 20, color: '#505050' }}>Camisa 10</Text>
      <Text style={{ color: '#505050' }}>Tampa: 4</Text>
    </View>
  </View>
);


export default function Organizadores() {

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#F8F8F8' }}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="filter" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
              </View>

              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                <Text>6</Text>
              </View>
            </View>

            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: 24, paddingHorizontal: 16, alignItems: 'center', paddingVertical: 12 }}>
              <Text style={{ color: '#505050', fontSize: 12, marginBottom: 16 }}>Busque os organizadores pelo nome, tampa, ou número da camisa.</Text>
              <Input
                variant="filled"
                placeholder="Buscar..."
                fontSize={12}
                style={{ backgroundColor: '#F2F2F2', height: 32 }}
                InputRightElement={
                  <AntDesign name="search1" size={15} color="#585858" style={{ marginRight: 8 }} />
                }
              />
            </View>
          </View>
        }
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

    </SafeAreaView>
  );
}
