import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Colors from "../constants/Colors";

const TypesTextbox = {
    Alfanumber: 'default',
    Number: 'numeric',
    Email: 'email-address',
    Phone: 'phone-pad',
    Url: 'url',
    Password: 'password'
};
const AlingsTextbox = {
    Left: 'left',
    Center: 'center',
    Right: 'right'
};

const TextBox = (props: any) => {

    const checkValue = (value:any) => {
        let result = '';
        if (!value) {
            return result;    
        }
        return value;
    }
    
    const checkAutoComplete = (autoComplete:any) =>  {
        let result = 'off';
        if (!autoComplete) {
            return result;    
        }
        return autoComplete;
    }

    const {
        typeTextbox = TypesTextbox.Alfanumber,
        placeHolder = '',
        autoComplete = checkAutoComplete(props.autoComplete),
        value = checkValue(props.value),
        alingText = AlingsTextbox.Left,
        width = 150,
        style = styles.input
    } = props;

    const onChangeText = (value: string) => {
        if (props.onChangeText) {
            props.onChangeText(value);
        }
    };
    
    const [currentValue, setCurrentValue] = useState<string>('');
    const getValue = useCallback(() => {
        const defaultValue = (value ? value : null);
        setCurrentValue(defaultValue);
    }, [value]);

    useEffect(() => {
        getValue();
    }, [value, getValue]);

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, {textAlign: alingText, minWidth: 50, width: width }, style]}
                secureTextEntry={(typeTextbox===TypesTextbox.Password)}
                keyboardType={(typeTextbox===TypesTextbox.Password ? TypesTextbox.Alfanumber : props.typeTextbox)}
                placeholder={props.placeHolder}
                autoComplete={autoComplete}
                defaultValue={currentValue}
                onChangeText={onChangeText}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
        backgroundColor: Colors.bgColorTextBox,
        color: Colors.textColorTextBox,
        borderWidth: 1,
        borderColor: Colors.borderColorTextBox
    },
});
export {TextBox, TypesTextbox, AlingsTextbox};