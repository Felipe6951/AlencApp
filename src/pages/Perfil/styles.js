import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#F1F1F1'
    },
    userPhoto: {
        width: 280,
        height: 280,
        marginTop: -50,
        marginBottom: -56
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
        borderBottomWidth: 1, 
        borderBottomColor: '#DDDDDD', 
        width: '100%', 
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
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        elevation: 2, 
        shadowColor: '#505050', 
        marginTop: 8, 
        paddingBottom: 24
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