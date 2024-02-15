import React from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Colors from "../constants/Colors";

const Button = (props) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={props.onClick}>
                <Text style={styles.button}>{props.label}</Text>
            </TouchableHighlight>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        padding: 10,
        margin: 10,
        backgroundColor: Colors.bgColorButton,
        alignItems: 'center',
        fontSize: 18,
        textAlign: 'center',
        color: Colors.textColorButton,
        borderRadius: 5,
        shadowColor: Colors.borderColorButton,
        shadowOpacity: 1,
        elevation: 5,
        minWidth: 150
    },
});
export default Button;