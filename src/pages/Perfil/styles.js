import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#FAFAFA'
    },
    userPhoto: {
        width: 120,
        height: 120,
        marginTop: "9%",
        marginBottom: "6%"
    },
    boxPrincipal: {
        alignSelf: 'center',
        marginTop: 8,
        marginBottom: 16
    },
    boxPrincipalNames: {
        alignItems: 'center'
    },
    nameTitle: {
        fontWeight: 'bold',
        color: '#505050',
        fontSize: 18
    },
    organizerTitle: {
        color: '#858585',
        fontSize: 15
    },
    line: {
        borderBottomWidth: 0.25, 
        borderBottomColor: '#909090', 
        width: '80%', 
        alignSelf: 'center',
        marginBottom: 8
    }, 
    boxAlencar:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 74, 
        marginVertical: 16 
    },
    subBoxAlencar: {
        alignItems: 'center'
    },
    alencarNumber: {
        color: '#C0212E', 
        fontWeight: '600'
    },
    alencarText: {
        fontSize: 12
    },
    boxInformations: {
        backgroundColor: '#FFFFFF', 
        borderRadius: 20,  
        marginTop: 8, 
        paddingBottom: 24,
        elevation: 5,
        shadowColor: "#909090"
    },
    boxSole: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 10,
        marginTop: 16, 
        marginHorizontal: 24 
    },
    boxSoleDirection: {
        flexDirection: 'row'
    },
    icons: {
        marginRight: 6,
        color: "#C0212E"
    },
    informations: {
        color: '#505050', 
        fontSize: 12
    }
})

export default styles;