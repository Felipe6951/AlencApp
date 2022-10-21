import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    boxBalls: {
        height: 160,
        left: 40,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: -25
    },
    userPhoto: {
        width: 180,
        left: -50
    },
    logoPhoto: {
        width: 50,
        left: -120,
        top: -25
    },
    boxTampa: {
        backgroundColor: "#C0212E",
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        left: -140,
        top: 20
    },
    boxTampaContent: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold"
    },
    boxUser: {
        left: 30,
        flexDirection: "row"
    },
    boxUserName: {
        fontSize: 14,
        color: "#FFFFFF",
        backgroundColor: "#C0212E",
        paddingHorizontal: 8,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        fontWeight: "bold",
        paddingVertical: 2
    },
    boxUserNumber: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFFFFF",
        backgroundColor: "#505050",
        paddingHorizontal: 8,
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
        paddingVertical: 2
    },
    boxCheck: {
        alignItems: "center", 
        backgroundColor: "#C0212E", 
        padding: 8, 
        borderRadius: 8,
        right: 80,
        top: 15
    },
    boxCheckContent: {
        marginTop: 8, 
        color: "#FFFFFF", 
        fontWeight: "bold", 
        fontSize: 16
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
        flexDirection: "column"
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
    orderTampa: {
        fontSize: 12
    },


})

export default styles;