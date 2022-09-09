import React from 'react';

import { Avatar, ChevronRightIcon, CircleIcon, CheckCircleIcon, InfoOutlineIcon } from 'native-base';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  return (

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home</Text>
    </View>
  );
}

