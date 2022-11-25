import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    img: {
        width: 180,
        height: 210
    },
    imgPosition: {
        alignSelf: 'center', 
        marginTop: 10
    },
    back: {
        backgroundColor: '#FAFAFA',
        height: '100%'
    },
    informationContent: {
        alignSelf: 'center', 
        marginHorizontal: 24, 
        alignItems: 'center',
        textAlign: "center"
    },
    textInformation: {
        fontSize: 12,
        color: '#505050'
    }
})

export default styles;