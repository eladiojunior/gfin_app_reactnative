import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Colors from '../constants/Colors';

const ReceitasView = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.title]}>GFin - Gerenciador Financeiro</Text>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={[styles.text, styles.title]}>Lista de Receitas</Text>
                </View>
            </ScrollView>
        </View>
    );
}
export default ReceitasView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColorApp,
        flex: 1,
    },
    header: {
        paddingTop: 13,
        backgroundColor: Colors.bgColorHeader,
        alignItems: 'center',
        textAlign: 'center',
        shadowColor: Colors.borderColorHeader,
        shadowOpacity: 1,
        elevation: 5,
        height: 55
    },
    content: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 5,
        gap: 16,
    },
    content_buttons: {
        paddingTop: 20,
        gap: 20,
    },
    text: {
        color: "white",
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.textColorTitulo
    },
});