import React from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, StyleSheet, View } from "react-native";
import FabButton from "../../components/fabButton/FabButton";

export default function Presenca() {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
       <Text>Hello Presenças</Text>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  }
})