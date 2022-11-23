import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#FAFAFA',
        height: '100%',
    },
    descriptionContent: {
        backgroundColor: '#FFFFFF',
        elevation: 5,
        shadowColor: '#505050',
        marginHorizontal: '5%',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    counter: {
        backgroundColor: '#FFFFFF',
        width: 25,
        height: 25,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardIcon: {
        color: "#FFFFFF",
        marginRight: 4
    },
    cardRed: {
        backgroundColor: '#8C1F28',
        elevation: 5,
        shadowColor: '#505050',
        height: 48,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        marginTop: 24,
        paddingHorizontal: 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row'
    },
    direction: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemCard: {
        height: 136,
        elevation: 5,
        shadowColor: '#000000',
        backgroundColor: '#FFFFFF',
        marginHorizontal: '5%',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 16
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    itemIcon: {
        marginRight: 8,
        color: "#C0212E"
    },
    itemName: {
        fontSize: 17
    },
    itemEmail: {
        fontSize: 15,
        color: '#505050'
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        width: width * 0.8,                                               /* BUG: modo paisagem */
        alignSelf: 'center',
        marginBottom: 8
    },
    buttonChooses: {
        backgroundColor: '#C0212E', 
        width: 128,                                                       /* BUG: modo paisagem */
        height: 32, 
        borderRadius: 8, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        marginTop: 8,
        marginHorizontal: 4
    },
    buttonChoosesPosition: {
        justifyContent: "center"
    },
    textButtonChooses: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    cardForItems: {
        marginBottom: 16
    },
    cardTitle: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    cardDescription: {
        fontSize: 12,
        color: '#505050'
    }, 
    line: {
        borderBottomWidth: 1, 
        borderBottomColor: '#DDDDDD', 
        width: '100%', 
        alignSelf: 'center',
        marginBottom: 8
    },
    txtZero: {
        color: 'gray',
        textAlign: "center",
        marginTop: 16
    }
});

export default styles;