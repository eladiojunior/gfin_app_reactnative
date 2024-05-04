import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Colors from "../constants/Colors";

const Button = (props: any) => {
    const {
        disabled = (props.disabled || false) //Se não informada deve ser ativo (disabled=false);
    } = props;
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={props.onClick} disabled={disabled} >
                <Text style={[styles.button, { opacity: !disabled ? 1 : 0.5 }]}>{props.label}</Text>
            </TouchableHighlight>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    button: {
        padding: 10,
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