import { useState } from "react";
import { AlingsTextbox, TextBox, TypesTextbox } from "./TextBox";

const CurrencyBox = (props: any) => {
    const {
        placeHolder = '',
        autoComplete = 'off',
        value = props.value,
    } = props;

    const formatCurrency = (value:number) => {
        if (isNaN(value)) return '';
        return value.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    };

    const handleChange = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        const floatValue = parseFloat(numericValue === '' ? '0' : numericValue) / 100;
        const formattedValue = formatCurrency(floatValue);
        setCurrentValue(formattedValue);
        if (props.onChangeValor) {
            props.onChangeValor(floatValue);
        }
    };
    
    const [currentValue, setCurrentValue] = useState(formatCurrency(value));

    return (
        <TextBox 
            value={currentValue} 
            alingText={AlingsTextbox.Right} 
            autoComplete={autoComplete}
            typeTextbox={TypesTextbox.Number} 
            onChangeText={handleChange}
            placeHolder='0,00'/>
    );
};
export default CurrencyBox;