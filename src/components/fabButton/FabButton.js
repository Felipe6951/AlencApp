import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Animated, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default class FabButton extends Component {

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
            <View style={[styles.container, this.props.style]}>
                <TouchableWithoutFeedback
                    onPress={() => Alert.alert('Adicionar')}
                    accessibilityLabel="eai"
                >

                    <Animated.View style={[styles.button, styles.submenu, addStyle]}>
                        <Entypo name="plus" size={20} color="#FFFFFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback onPress={[this.toggleOptions, ]} >
                    <Animated.View style={[styles.button, styles.menu, rotation]}>
                        <Entypo name="plus" size={24} color="#FFFFFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute',
        left: 300,
        top: 580
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 10,
        shadowColor: "#C0212E",
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10
        },
    },
    menu: {
        backgroundColor: "#C0212E"
    },
    submenu: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: "#FF4554"
    }
})