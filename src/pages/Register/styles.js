import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#FFFFFF'
    },
    img: {
        width: 140, 
        height: 160
    },
    form: {
        marginHorizontal: 24
    },
    formFields: {
        marginBottom: 8
    },
    actionsBottom: {
        marginTop: 20
    },
    buttonRegister: {
        backgroundColor: '#C0212E', 
        height: 40, 
        borderRadius: 8, 
        marginBottom: 40,
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    buttonIconRegister: {
        marginRight: 4,
        color: "#FFFFFF" 
    },
    register: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    boxSignup: {
         flexDirection: 'row', 
         marginTop: 16, 
         justifyContent: 'center', 
         marginVertical: 24 
    },
    textSignup: {
        fontSize: 12,
        color: '#505050',
        marginRight: 4 
    },
    buttonSignup: {
        fontSize: 12, 
        color: '#505050',
        fontWeight: 'bold' 
    },
    logoPosition: {
        alignSelf: 'center',
         marginTop: 50, 
         marginBottom: 24
    },
    buttonEye: {
        marginRight: 12
    },
    line: {
        borderBottomWidth: 0.2,
        borderColor: "#909090",
        width: "80%",
        alignSelf: "center"
    },
    textInput: {
        borderColor: '#D5D5D5',
        paddingHorizontal: 12, 
        paddingVertical: 8, 
        borderRadius: 4, 
        borderWidth: 1
    },
    textInputFocus: {
        borderColor: '#4B8D99',
        paddingHorizontal: 12, 
        paddingVertical: 8, 
        borderRadius: 4, 
        borderWidth: 1
    }
})

export default styles;