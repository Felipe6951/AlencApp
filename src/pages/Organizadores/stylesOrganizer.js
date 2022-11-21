import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fabContent: {
        alignItems: 'center',
        position: 'absolute',
        left: 300,
        top: 580
    },
    fabButton: {
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
        }
    },
    fabText: {
        right: 75,
        fontSize: 12,
        width: 110,
        backgroundColor: "#FFFFFF", 
        color: '#FF4554',
        borderRadius: 4,
        padding: 4
    },
    submenuIcon: {
        right: 55
    },
    menu: {
        backgroundColor: "#C0212E", 
    },
    submenu: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: "#FF4554"
    },
    boxItem: {
        width: '90%',
        alignSelf: 'center',
        height: 104,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        shadowColor: '#505050',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 16
    },
    boxItemName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    itemClass: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    itemName: {
        fontSize: 15,
        color: '#505050'
    },
    itemIcon: {
        marginRight: 8,
        color: "#C0212E"
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        width: '100%',
        alignSelf: 'center',
        marginBottom: 8
    },
    boxAlencar: {
        flexDirection: 'row',
        marginLeft: 4
    },
    tshirt: {
        marginRight: 20,
        color: '#505050'
    },
    cover: {
        color: '#505050'
    },
    searchIcons: {
        marginLeft: 8,
        color: "#585858",
    },
    searchIconClean: {
        color: "#585858",
        marginRight: 8
    },
    boxCard: {
        marginBottom: 24,
    },
    teste: {
        flexDirection: 'row',
    },
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

export default styles;