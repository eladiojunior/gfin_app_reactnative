import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const CheckBox = (props: any) => {
    const {
        label = (props.label || "Checkbox")
    } = props;
    const [selected, setSelected] = React.useState(props.selected);

    const onSelectedClick = () => {
        if (props.onSelected) {
            props.onSelected(!selected);
        }
        setSelected(!selected);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onSelectedClick}>
                <View style={styles.checkbox}>
                    {selected ? <View style={styles.checkbox_selected} /> : null}
                </View>
            </TouchableOpacity>
            <Text style={styles.checkbox_text} onPress={onSelectedClick}>{label}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    checkbox: {
        height: 24,
        width: 24,
        borderWidth: 2,
        borderColor: Colors.textColorCheckbox,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox_selected: {
        height: 12,
        width: 12,
        backgroundColor: Colors.bgColorCheckboxSelected
    },
    checkbox_text: {
        paddingLeft: 5,
        fontSize: 18,
        color: Colors.textColorCheckbox,
    },
});
export default CheckBox;