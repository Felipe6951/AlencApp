import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Informa a hora e data atual
// function DateTime() {
//     var dataAtual = new Date();
//     var dia = dataAtual.getDate();
//     var mes = (dataAtual.getMonth() + 1);
//     var ano = dataAtual.getFullYear();
//     var horas = dataAtual.getHours();
//     var minutos = dataAtual.getMinutes();
//     var date = (horas + ":" + minutos + " - " + dia + "/" + mes + "/" + ano);
//     return date;
// }

// Dados do FireBase
const NOTIFICATIONS = [
    {
        id: 1,
        motive: 'Jogo cancelado',
        description: 'O jogo foi cancelado, pois o tempo de chuva está nos impedindo de jogar. Até o próximo jogo.',
        // date: DateTime(),
        date: '18:34 - 18/11/2022'
    },
    {
        id: 2,
        motive: 'Mudança de horário',
        description: 'Em virtude das festa da FINECAP, a realização do nosso racha, especialmente hoje, será as 17:30. Obrigado pela compreensão!',
        // date: DateTime(),
        date: '18:48 - 18/11/2022'
    },
    {
        id: 3,
        motive: 'Outro',
        description: 'Decisão da comissão organizadora.',
        // date: DateTime(),
        date: '22:26 - 19/11/2022'
    }
];

export default function Notifications() {

    // Item renderizado na FlatList
    const Item = ({ motive, description, date }) => (
        <View style={styles.notification}>
            <View style={styles.headerNotification}>
                <Ionicons name="alert-circle" size={22} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.title}>{motive}</Text>
            </View>
            <View style={styles.boxDescription}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <FlatList
                data={NOTIFICATIONS}
                renderItem={({ item }) => <Item motive={item.motive} description={item.description} date={item.date} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );

    console.log(dataAtual)
}

// Estilização de componentes
const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        height: "100%",
        backgroundColor: "#FAFAFA",
    },
    boxDescription: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#FFFFFF",
        paddingTop: 16,
        paddingBottom: 8,
        paddingHorizontal: 16,
        elevation: 5,
        shadowColor: '#505050',
        width: '90%',
    },
    title: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 18,
    },
    headerNotification: {
        width: '100%',
        paddingLeft: 16,
        paddingVertical: 12,
        backgroundColor: '#8C1F28',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        alignItems: "center",
        width: '90%'
    },
    description: {
        textAlign: "justify"
    },
    date: {
        alignSelf: 'flex-end',
        marginTop: 8,
        fontSize: 12,
        color: '#C0212E'
    },
    notification: {
        marginBottom: 16,
        alignItems: "center"
    }
})
