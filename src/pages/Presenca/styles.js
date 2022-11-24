import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    boxHeader: {
        height: '24%',
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 24,
        paddingVertical: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: -25
    },
    username: {
        fontSize: 20,
        fontWeight: "700"
    },
    userPhoto: {
        width: 80,
        height: 80,
        marginRight: 16
    },
    boxOrder: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 0.25,
        borderColor: "#DBDBDB",
        alignItems: "center"
    },
    orderInfo: {
        flexDirection: "column",
        paddingHorizontal: 6
    },
    orderIcon: {
        color: "#909090",
        marginRight: 10,
        marginLeft: 14
    },
    orderNumber: {
        fontSize: 12,
        color: "#505050"
    },
    orderUsername: {
        fontWeight: "600",
        fontSize: 15
    },
    teamNumber: {
        fontSize: 14,
        fontWeight: "bold",
    },
    players: {
        fontSize: 16,
        fontWeight: "500"
    },
    boxPlayer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 0.25,
        borderColor: '#DBDBDB'
    },
    user: {
        width: 40,
        height: 40,
        marginLeft: 14,
        marginRight: 2
    },
    boxTeam: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 0.25,
        borderColor: '#DBDBDB',
        backgroundColor: "#F1F1F1",
        flexDirection: "row",
        alignItems: "center"
    },
    tampimetro: {
        width: "30%",
        height: 14,
        backgroundColor: "#ED4654",
        marginLeft: 40,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8
    },
    tampimetroAux: {
        height: 14,
        width: "40%",
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: "#909090",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        paddingRight: 6
    },
    star: {
        color: "#FFFFFF",
        marginRight: 6
    },
    infoPlayer: {
        flexDirection: "column",
        paddingHorizontal: 6,
    },
    tampa: {
        fontSize: 14,
        color: "#505050"
    },
    infoUsers: {
        flexDirection: "column"
    },
    infoUsersAux: {
        flexDirection: "row",
        marginTop: 8
    },
    boxCamisa: {
        alignItems: "center",
        marginRight: 8
    },
    boxTampa: {
        alignItems: "center"
    },
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
        backgroundColor: "#FFFFFF",
        color: '#FF4554',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignItems: "center", 
        width: '200%'
    },
    submenuIcon: {
        right: 48.5
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
    align: {
        flexDirection: 'row'
    }
})

export default styles;