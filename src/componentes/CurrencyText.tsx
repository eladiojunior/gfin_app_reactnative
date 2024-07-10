import React from "react";
import { Text, View } from "react-native";
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
};
const CurrencyText = (props: any) => {
    let result = typeof props.value === 'number' && !isNaN(props.value) ? props.value : 0;
    return (
        <View>
            <Text>{formatCurrency(result)}</Text>
        </View>
    );
};
export default CurrencyText;