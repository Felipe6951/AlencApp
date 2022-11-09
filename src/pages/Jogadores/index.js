import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Alert, Animated } from 'react-native';
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native'

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where } from 'firebase/firestore'
import { Swipeable } from 'react-native-gesture-handler';
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';


export default function Jogadores() {

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const q = query(collection(firestore, "membros"), where("situacao", "==", "Aceito"));

  const [DATA, setData] = useState([]);

  const [visibleInactive, setVisibleInactive] = React.useState(false);
  const showInactive = () => setVisibleInactive(true);
  const hideInactive = () => setVisibleInactive(false);

  const [visibleDelete, setVisibleDelete] = React.useState(false);
  const showDelete = () => setVisibleDelete(true);
  const hideDelete = () => setVisibleDelete(false);


  const InputSearch = () => (
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
  );

  const CardHeader = () => (
    <View style={{ marginVertical: 24 }}>
      <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '5%', borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingHorizontal: 16, flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="filter" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{list.length}</Text>
        </View>
      </View>

      <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: '5%', paddingHorizontal: 16, alignItems: 'center', paddingVertical: 12 }}>
        <Text style={{ color: '#505050', fontSize: 12, marginBottom: 16 }}>Busque os jogadores pelo nome, tampa, ou número da camisa.</Text>
        <InputSearch />
      </View>
    </View>
  );

  const [searchPlayer, setSearchPlayer] = useState('');
  const [list, setList] = useState(DATA);
  const test = list.find((item) => item.name === searchPlayer);

  useFocusEffect(
    React.useCallback(() => {

      const unsubcribe = onSnapshot(q, (querySnapshot) => {
        const members = [];
        querySnapshot.forEach((doc) => {
          members.push({ ...doc.data(), id: doc.id });
        })

        setData(members);
      });

      return () => {
        unsubcribe();
      };

    }, [])
  );

  useEffect(() => {

    if (searchPlayer === "") {
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


  function LeftActions(progress, dragX) {

    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    return (
      <View>
        <TouchableOpacity
          onPress={showInactive}
          style={{ elevation: 5, shadowColor: '#505050', height: 103, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F1F1', marginLeft: 24, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, paddingLeft: 32, paddingRight: 40, marginRight: -24 }}>
          <Animated.Text style={styles.actionIcon}>...</Animated.Text>
          <Animated.Text style={styles.actionText}>Inativo</Animated.Text>
        </TouchableOpacity>
      </View>
    )
  }

  function RightActions(progress, dragX) {

    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    return (
      <View>
        <TouchableOpacity
          onPress={showDelete}
          style={{ elevation: 5, shadowColor: '#505050', height: 103, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ED4654', marginRight: 24, borderTopRightRadius: 8, borderBottomRightRadius: 8, paddingRight: 32, paddingLeft: 40, marginLeft: -32 }}>
          <Feather name="trash-2" size={20} color="white" />
          <Text style={styles.actionTextRemove}>Excluir</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const Item = ({ name, tampa, camisa }) => (
    <Swipeable
      renderLeftActions={LeftActions}
      renderRightActions={RightActions}
    >
      <View style={{ width: '90%', alignSelf: 'center', height: 104, marginBottom: 16, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#505050', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 8 }}>
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
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#FAFAFA', height: '100%' }}>
      <FlatList
        ListHeaderComponent={
          <View >
            <CardHeader />
          </View>
        }
        data={list}
        renderItem={({ item }) => <Item name={item.name} tampa={item.tampa} camisa={item.camisa} />}
        keyExtractor={item => item.id}
      />

      <Provider>
        <View>
          <Portal>
            <Dialog visible={visibleInactive} onDismiss={hideInactive} style={{ borderRadius: 8, backgroundColor: 'white' }}>
              <Dialog.Title>Jogador inativo</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Tem certeza que deseja tornar este jogador inativo?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <TouchableOpacity onPress={hideInactive}>
                  <Text style={{ color: 'red', paddingHorizontal: 4 }}>CANCELAR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={hideInactive}>
                    <Text style={{ color: 'red', paddingHorizontal: 8, paddingVertical: 4 }}>CONFIRMAR</Text>
                </TouchableOpacity>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>

      <Provider>
        <View>
          <Portal>
            <Dialog visible={visibleDelete} onDismiss={hideDelete} style={{ borderRadius: 8, backgroundColor: 'white' }}>
              <Dialog.Title>Deletar jogador</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Tem certeza que deseja deletar este jogador?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <TouchableOpacity onPress={hideDelete}>
                  <Text style={{ color: 'red', paddingHorizontal: 4 }}>CANCELAR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={hideDelete}>
                  <Text style={{ color: 'red', paddingHorizontal: 4 }}>CONFIRMAR</Text>
                </TouchableOpacity>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionText: {
    color: 'gray',
    fontSize: 14,
  },
  actionIcon: {
    color: 'gray',
    fontSize: 26,
  },
  actionTextRemove: {
    color: "#FFFFFF",
    fontSize: 14,
  }
})

