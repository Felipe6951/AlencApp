import React from "react";
import { View, StyleSheet } from "react-native";

export default function Divider() {
    return (
        <View style={styles.line}/>
    );
}

const styles = StyleSheet.create({
    line: {
        borderBottomWidth: 1, 
        borderBottomColor: '#DDDDDD', 
        width: '75%', 
        alignSelf: 'center' 
    }
})