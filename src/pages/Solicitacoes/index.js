import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons, AntDesign, FontAwesome, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

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
  <View style={{ height: 136, width: 312, elevation: 5, shadowColor: '#000000', backgroundColor: '#FFFFFF', marginHorizontal: 24, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 16, marginBottom: 16 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
      <FontAwesome name="user-circle" size={24} color="#C0212E" style={{ marginRight: 8 }} />
      <View>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ fontSize: 15, color: '#505050' }}>kaioedu2003@gmail.com</Text>
      </View>
    </View>

    <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center', marginBottom: 8 }} />

    <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
      <TouchableOpacity
        style={{ marginRight: 8, backgroundColor: '#C0212E', width: 128, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 8 }}
        onPress={() => Alert.alert('Recusou!')}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Recusar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: '#C0212E', width: 128, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 8 }}
        onPress={() => Alert.alert('Aceitou!')}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Aceitar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function Solicitacoes() {

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={{backgroundColor: '#F1F1F1'}}>
      <FlatList
        ListHeaderComponent={
          <View style={{ marginBottom: 24 }}>
            <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="new-releases" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Novos cadastros</Text>
              </View>

              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                <Text>2</Text>
              </View>
            </View>

            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: 24, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
              <Text style={{ color: '#505050', fontSize: 12 }}>Solicitações de cadastro no Alencar Futebol Clube</Text>
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

