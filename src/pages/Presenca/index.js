import React from "react";
import { Dimensions, StatusBar, Animated, SafeAreaView, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, Center, useColorModeValue } from 'native-base';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styles from "./styles";
import { Alert } from "react-native";

const DATA = [
  {
    id: 1,
    username: 'marc123',
    tampa: 5,
    number: 1
  },
  {
    id: 2,
    username: 'felps',
    tampa: 2,
    number: 2
  },
  {
    id: 3,
    username: 'kayn',
    tampa: 1,
    number: 3
  },
  {
    id: 4,
    username: 'jota',
    tampa: 1,
    number: 4
  },
  {
    id: 5,
    username: 'guguy',
    tampa: 1,
    number: 5
  },
  {
    id: 6,
    username: 'ian',
    tampa: 5,
    number: 6
  },
  {
    id: 7,
    username: 'lola',
    tampa: 5,
    number: 7
  },
  {
    id: 8,
    username: 'daniel',
    tampa: 4,
    number: 8
  },
  {
    id: 9,
    username: 'junho',
    tampa: 2,
    number: 9,
  }
]


const Item = ({ username, tampa, number}) => (
  <TouchableOpacity style={styles.boxOrder} onPress={() =>
    Alert.alert(
      username,
      'Grande jogador',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed') },
        { text: 'ok', onPress: () => Alert.alert('Jogador ' + username + ' OK!')},
      ],
    )}>
    <Text style={styles.orderNumber}>{number}°</Text>
    <FontAwesome name="user" size={32} style={styles.orderIcon} />
    <View style={styles.orderInfo}>
      <Text style={styles.orderUsername}>{username}</Text>
      <Text style={styles.orderTampa}>{tampa}</Text>
    </View>
  </TouchableOpacity>
);

const FirstRoute = () => <FlatList
  flex={1}
  my="4"
  showsVerticalScrollIndicator={false}
  data={DATA}
  renderItem={({ item }) => <Item username={item.username} tampa={item.tampa} number={item.number} />}
  keyExtractor={item => item.id}
/>;

const SecondRoute = () => <Center flex={1} my="4">
  This is Tab 2
</Center>;

const initialLayout = {
  width: Dimensions.get('window').width
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
});


export default function Presenca() {

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
      <View style={styles.boxBalls}>
        <Image style={styles.userPhoto} source={require('../../assets/img/user_null.png')} resizeMode="contain" />
        <Image style={styles.logoPhoto} source={require('../../assets/img/logo_afc.png')} resizeMode="contain" />
        <View style={styles.boxTampa}>
          <Text style={styles.boxTampaContent}>5</Text>
        </View>

        <TouchableOpacity style={styles.boxCheck} onPress={() => Alert.alert('Presenças', 'Realizou check-in')}>
          <MaterialCommunityIcons name="qrcode-scan" size={45} color="#FFFFFF" />
          <Text style={styles.boxCheckContent}>Check-in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boxUser}>
        <Text style={styles.boxUserName}>marc123</Text>
        <Text style={styles.boxUserNumber}>10</Text>
      </View>
      <Example />
    </SafeAreaView >
  );
}
