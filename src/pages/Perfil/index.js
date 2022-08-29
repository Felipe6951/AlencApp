import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function Perfil() {
  return (
    <SafeAreaView style={{ backgroundColor: '#F2F2F2' }}>
      <ScrollView>
        <View>
          <View style={{ alignSelf: 'center', marginTop: 8, marginBottom: 16 }}>
            <Image
              source={require('../../assets/img/user.png')}
              style={{ width: 140, height: 160 }}
              resizeMode="contain"
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: '#505050', fontSize: 18 }}>@root_admin</Text>
              <Text style={{ color: '#858585', fontSize: 15 }}>Organizador</Text>
            </View>
          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center' }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 74, marginVertical: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#C0212E', fontWeight: '600' }}>10</Text>
              <Text style={{ fontSize: 12 }}>CAMISA</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#C0212E', fontWeight: '600' }}>1</Text>
              <Text style={{ fontSize: 12 }}>TAMPA</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 2, shadowColor: '#000000', marginTop: 8, paddingBottom: 16}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="soccer-ball-o" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Status</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>ATIVO</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="user-circle" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Nome</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>Root Admin</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="user" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Usuário</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>@root_admin</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons name="email" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Email</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>root@gmail.com</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="phone" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Telefone</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>(84) 2042-4435</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="refresh" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Frequência</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>80%</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24, marginVertical: 16 }}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="today" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Dias</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>Seg, Qua</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  }
});