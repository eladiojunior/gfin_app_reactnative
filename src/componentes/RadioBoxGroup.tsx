import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const _ = require('lodash');

const OrientationItens = {
    Horizontal: 1,
    Vertical: 2
};

const dataDefault = [
    { label: 'Radio 01', value: '1' },
    { label: 'Radio 02', value: '2' },
    { label: 'Radio 03', value: '3' },
];
const RadioBoxGroup = (props: any) => {
    const {
        data = dataDefault,
        labelField = (props.labelField ? props.labelField : "label"),
        valueField = (props.valueField ? props.valueField : "value"),
        valueItem = "",
        orientationItens = OrientationItens.Horizontal
    } = props;

    const [currentValue, setCurrentValue] = useState<any>(null);

    const onSelectedRadio = (item: any) => {
        if (props.onSelected) {
            props.onSelected(item);
        }
        setCurrentValue(item);
    };

    const getValue = useCallback(() => {
        const defaultValue = typeof valueItem === 'object' ? _.get(valueItem, valueField) : valueItem;
        const getItem = data.filter((item: any) =>
            _.isEqual(defaultValue, _.get(item, valueField))
        );
        if (getItem.length > 0) {
            setCurrentValue(getItem[0]);
        } else {
            setCurrentValue(null);
        }
    }, [data, valueItem, valueField]);

    useEffect(() => {
        getValue();
    }, [valueItem, data, getValue]);

    const _renderRadioBox = (item: any) => {
        const labelItem = _.get(item, labelField);
        const valueItem = _.get(item, valueField);
        const valueItemSelected = currentValue && _.get(currentValue, valueField);
        const isItemSelected = (valueItemSelected && valueItemSelected === valueItem);
        return (
            <View key={valueItem} style={styles.radiobox_group}>
                <TouchableOpacity onPress={() => onSelectedRadio(item)}>
                    <View style={styles.radiobox}>
                        {isItemSelected ? <View style={styles.radiobox_selected} /> : null}
                    </View>
                </TouchableOpacity>
                <Text style={styles.radiobox_text} onPress={() => onSelectedRadio(item)}>{labelItem}</Text>
            </View>
        );
    };

    return (
        <View style={StyleSheet.flatten([
            styles.container, 
            orientationItens && orientationItens === OrientationItens.Horizontal ? {flexDirection: "row"} : {flexDirection: "column"}])}>
            {data.map((item: any) => {
                return (_renderRadioBox(item));
            })}
        </View>
    );
    
};
const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: "center"
    },
    radiobox_group: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    radiobox: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.borderColorRadiobox,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radiobox_selected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: Colors.bgColorRadioboxSelected
    },
    radiobox_text: {
        paddingLeft: 5,
        fontSize: 18,
        color: Colors.textColorRadiobox,
    },
});
export {RadioBoxGroup, OrientationItens}