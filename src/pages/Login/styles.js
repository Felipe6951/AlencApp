import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#FAFAFA',
        height: '100%'
    },
    logoPosition: {
        alignSelf: 'center',
        marginTop: 58,
        marginBottom: 32
    },
    logo: {
        width: 180,
        height: 200
    },
    formFields: {
        marginBottom: 8,
        marginHorizontal: 24
    },
    input: {
        fontSize: 15,
        placeholderTextColor: '#888888',
        paddingLeft: 12
    },
    buttonEye: {
        marginRight: 12
    },
    iconEye: {
        color: '#505050',
        fontSize: 25
    },
    boxLogin: {
        marginTop: 24,
        marginHorizontal: 24
    },
    buttonLogin: {
        backgroundColor: '#C0212E',
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textButtonEnter: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#FFFFFF'
    },
    boxActions: {
        flexDirection: 'row',
        marginTop: 24,
        justifyContent: 'center'
    },
    buttonActions: {
        color: '#505050',
        fontSize: 12,
        fontWeight: 'bold'
    },
    textActions: {
        color: '#505050',
        fontSize: 12,
        marginRight: 4
    },
    iconButtonLogin: {
        color: '#FFFFFF',
        marginRight: 6
    },
    boxGlobal: {
      marginTop: '25%'
    },
    line: {
        borderBottomWidth: 0.2,
        borderColor: "#909090",
        width: "70%",
        alignSelf: "center"
    },
    actionSheetFocus: {
        paddingBottom: "80%"
    }
})

export default styles;