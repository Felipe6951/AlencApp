import React, { useState } from "react";
import { Alert, Dimensions, StatusBar, Animated, SafeAreaView, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, Center, useColorModeValue } from 'native-base';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import styles from "./styles";

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where, serverTimestamp, orderBy, setDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

export default function Presenca() {

  const [ORDER, setOrder] = useState([])

  const TIMES = [
    {
      id: 1,
      player1: 'Marcos',
      player2: 'Felipe',
      player3: 'Kaio',
      player4: 'Jota',
      player5: 'Lola'
    },
    {
      id: 2,
      player1: 'Josimiel',
      player2: 'Ian',
      player3: 'Gustavo',
      player4: 'Ismael',
      player5: 'Luiz'
    }
  ]


  const ItemOrder = ({ username, tampa, number }) => (
    <View style={styles.boxOrder}>
      <Text style={styles.orderNumber}>{number}°</Text>
      <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
      <View style={styles.orderInfo}>
        <Text style={styles.players}>{username}</Text>
        <Text style={styles.tampa}>Tampa {tampa}</Text>
      </View>
    </View>
  );

  const FirstRoute = () => <FlatList
    flex={1}
    my="4"
    showsVerticalScrollIndicator={false}
    data={ORDER}
    renderItem={({ item }) => <ItemOrder username={item.user} tampa={item.tampa} number={item.number} />}
    keyExtractor={item => item.id}
  />;

  const ItemTimes = ({ player1, player2, player3, player4, player5 }) => (
    <View>
      <View style={styles.boxTeam}>
        <Text style={styles.teamNumber}>Time X</Text>
        <View style={styles.tampimetro} />
        <View style={styles.tampimetroAux}>
          <AntDesign name="star" size={8} style={styles.star} />
          <AntDesign name="star" size={8} style={styles.star} />
          <AntDesign name="star" size={8} style={styles.star} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.boxPlayer}
        onPress={() => Alert.alert(player1, "Jogador caro", [{ text: "Cancelar", onPress: () => console.log("Cancel Pressed") }, { text: "OK", onPress: () => console.log("OK Pressed") }])}>
        <Text style={styles.orderNumber}>1°</Text>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player1}</Text>
          <Text style={styles.tampa}>Tampa 1</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boxPlayer}
        onPress={() => Alert.alert(player2, "Jogador caro", [{ text: "Cancelar", onPress: () => console.log("Cancel Pressed") }, { text: "OK", onPress: () => console.log("OK Pressed") }])}>
        <Text style={styles.orderNumber}>2°</Text>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player2}</Text>
          <Text style={styles.tampa}>Tampa 1</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boxPlayer}
        onPress={() => Alert.alert(player3, "Jogador caro", [{ text: "Cancelar", onPress: () => console.log("Cancel Pressed") }, { text: "OK", onPress: () => console.log("OK Pressed") }])}>
        <Text style={styles.orderNumber}>3°</Text>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player3}</Text>
          <Text style={styles.tampa}>Tampa 1</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boxPlayer}
        onPress={() => Alert.alert(player4, "Jogador caro", [{ text: "Cancelar", onPress: () => console.log("Cancel Pressed") }, { text: "OK", onPress: () => console.log("OK Pressed") }])}>
        <Text style={styles.orderNumber}>4°</Text>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player4}</Text>
          <Text style={styles.tampa}>Tampa 1</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boxPlayer}
        onPress={() => Alert.alert(player5, "Jogador caro", [{ text: "Cancelar", onPress: () => console.log("Cancel Pressed") }, { text: "OK", onPress: () => console.log("OK Pressed") }])}>
        <Text style={styles.orderNumber}>5°</Text>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player5}</Text>
          <Text style={styles.tampa}>Tampa 1</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const SecondRoute = () => <FlatList
    flex={1}
    my="4"
    showsVerticalScrollIndicator={false}
    data={TIMES}
    renderItem={({ item }) => <ItemTimes player1={item.player1} player2={item.player2} player3={item.player3} player4={item.player4} player5={item.player5} />}
    keyExtractor={item => item.id}
  />;

  const initialLayout = {
    width: Dimensions.get('window').width
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
  });

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  const q = query(collection(firestore, "membros"), where("email", "==", auth.currentUser.email));
  const p = query(collection(firestore, "presence"), orderBy("timestamp", "asc"));

  const [usuario, setUser] = useState([])
  const [present, setPresent] = useState(0)

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push(doc.data().user);
        members.push(doc.data().tampa);
        members.push(doc.data().camisa);
        members.push(doc.data().name);
      })

      setUser(members);
    });
  }, []);

  const presence = () => {
    setDoc(doc(firestore, "presence", usuario[3]), {
      name: usuario[3],
      user: usuario[0],
      camisa: usuario[2],
      tampa: usuario[1],
      created_at: serverTimestamp(Date)
    })
      .then(() => {
        setPresent(present+1)
        Alert.alert(
          "Sucesso!",
          "Presença confirmada!",
          
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        )
      })
      .catch(error => {
        Alert.alert(
          "Erro!",
          "Algo deu errado na sua presença.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        )
      })
  }

  useEffect (() => {
    onSnapshot(p, (querySnapshot) => {
      const presents = [];
      querySnapshot.forEach((doc) => {
        presents.push({ ...doc.data(), id: doc.id });
      })

      setOrder(presents);
    });
  }, [present]);

  function Example() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([{
      key: 'first',
      title: 'ORDEM DE CHEGADA'
    }, {
      key: 'second',
      title: 'TIMES'
    }]);

    TouchableOpacity.defaultProps = { activeOpacity: 0.9 };

    const renderTabBar = props => {

      const inputRange = props.navigationState.routes.map((x, i) => i);

      return <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
          });
          const color = index === i ? useColorModeValue('#C0212E', '#C0212E') : useColorModeValue('#C0212E', '#C0212E');
          const borderColor = index === i ? '#C0212E' : useColorModeValue('coolGray.200', 'gray.400');
          return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer" backgroundColor={"#FFFFFF"} style={{ borderTopColor: "#DBDBDB", borderTopWidth: 0.25 }}>
            <TouchableOpacity onPress={() => { setIndex(i); }}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          </Box>;
        })}
      </Box>;
    };

    return <TabView navigationState={{ index, routes }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{ marginTop: StatusBar.currentHeight }} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <StatusBar />
      <View style={styles.boxHeader}>
      
          <Image style={styles.userPhoto} source={require('../../assets/img/userBig.png')} resizeMode="contain" />
          <View style={styles.infoUsers}>
            <Text style={styles.username}>{usuario[0]}</Text>
            <View style={styles.infoUsersAux}>
              <View style={styles.boxCamisa}>
                <Text>CAMISA</Text>
                <Text>{usuario[2]}</Text>
              </View>
              <View style={styles.boxTampa}>
                <Text>TAMPA</Text>
                <Text>{usuario[1]}</Text>
              </View>
            </View>
          </View>
       
        <View style={{marginLeft: 24}}>
          <TouchableOpacity 
          style={{backgroundColor: '#ED4654', paddingVertical: 10, paddingHorizontal: 16, alignItems: "center", borderRadius: 8}}
          onPress={presence}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="#FFFFFF" />
            <Text style={{color: '#FFFFFF', marginTop: 8}}>Check-in</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Example />
    </SafeAreaView >
  );
}

/**/
