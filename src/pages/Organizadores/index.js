import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from './stylesOrganizer';
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where } from 'firebase/firestore'

export default function Organizadores() {

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const q = query(collection(firestore, "membros"), where("type", "==", "Organizador"));

  const [DATA, setData] = useState([]);

  const [visibleDelete, setVisibleDelete] = React.useState(false);
  const showDelete = () => setVisibleDelete(true);
  const hideDelete = () => setVisibleDelete(false);

  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(DATA);

  const navigation = useNavigation();


  useEffect(() => {
    if (searchText === '') {
      setList(DATA);
    } else {
      setList(
        DATA.filter(item => (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || item.camisa.indexOf(searchText) > -1 || item.tampa.indexOf(searchText) > -1))
      );
    }
  }, [searchText]);

  class FabOrganizer extends Component {
    animation = new Animated.Value(0)

    toggleOptions = () => {
      const toValue = this.open ? 0 : 1

      Animated.spring(this.animation, {
        toValue,
        friction: 7,
        useNativeDriver: true,
      }).start();

      this.open = !this.open;
    }

    render() {

      const addStyle = {
        transform: [
          { scale: this.animation },
          {
            translateY: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -55]
            })
          }
        ]
      }

      const rotation = {
        transform: [
          {
            rotate: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "135deg"]
            })
          }
        ]
      }

      return (
        <View style={[styles.fabContent, this.props.style]}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleOptions();
              navigation.navigate('NewOrganizer');
            }}
          >
            <Animated.View style={[styles.fabButton, styles.submenu, styles.teste, addStyle]}>
              <Text style={styles.fabText}> Novo organizador </Text>
              <Entypo name="plus" size={20} color="#FFFFFF" style={styles.submenuIcon} />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.toggleOptions}>
            <Animated.View style={[styles.fabButton, styles.menu, rotation]}>
              <Entypo name="plus" size={24} color="#FFFFFF" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
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
      renderRightActions={RightActions}
    >
      <View style={styles.boxItem}>
        <View style={styles.boxItemName}>
          <FontAwesome name="user-circle" size={24} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemClass}>Organizador</Text>
            <Text style={styles.itemName}>{name}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.boxAlencar}>
          <Text style={styles.tshirt}>Camisa {camisa}</Text>
          <Text style={styles.cover}>Tampa: {tampa}</Text>
        </View>
      </View>
    </Swipeable>
  );

  useFocusEffect(
    React.useCallback(() => {

      const unsubcribe = onSnapshot(q, (querySnapshot) => {
        const members = [];
        querySnapshot.forEach((doc) => {
          members.push({ ...doc.data(), id: doc.id });
        })
        setData(members);
        setList(members);
        console.log("entrou");
      });

      return () => {
        unsubcribe();
      };

    }, [])
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#FAFAFA', height: '100%' }}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.boxCard}>
            <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '5%', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="filter" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
              </View>

              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{DATA.length}</Text>
              </View>
            </View>

            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: '5%', paddingHorizontal: 16, alignItems: 'center', paddingVertical: 12 }}>
              <Text style={{ color: '#505050', fontSize: 12, marginBottom: 16, textAlign: 'justify' }}>Busque os organizadores pelo nome, tampa, ou número da camisa.</Text>
              <Input
                placeholder="Buscar..."
                fontSize={15}
                variant="outline"
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                height={10}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                InputLeftElement={<AntDesign name="search1" size={18} style={styles.searchIcons} />}
                InputRightElement={
                  <TouchableOpacity onPress={() => setSearchText('')}>
                    <MaterialIcons name="highlight-remove" size={20} style={styles.searchIconClean} />
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

      <FabOrganizer />

      <Provider>
        <View>
          <Portal>
            <Dialog visible={visibleDelete} onDismiss={hideDelete} style={{ borderRadius: 8, backgroundColor: 'white' }}>
              <Dialog.Title>Deletar organizador</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Tem certeza que deseja deletar este organizador?</Paragraph>
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