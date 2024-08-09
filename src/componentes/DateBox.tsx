import { useState } from "react";
import { AlingsTextbox, TextBox, TypesTextbox } from "./TextBox";

const DateBox = (props: any) => {
    const {
        placeHolder = '',
        autoComplete = 'off',
        value = props.value,
    } = props;

    const formatDate = (value: string) => {
        value = value.replace(/[^0-9]/g, '');
        const tam = value.length;
        if (tam > 2 && tam <= 4)
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        else if (tam > 4)
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
        return value;
    };

    const handleChange = (value: string) => {
        value = formatDate(value);
        setCurrentValue(value);
        if (props.onChangeDate) {
            props.onChangeDate(value);
        }
    };
    
    const [currentValue, setCurrentValue] = useState('');

    return (
        <TextBox 
            value={currentValue} 
            alingText={AlingsTextbox.Center} 
            autoComplete={autoComplete}
            typeTextbox={TypesTextbox.Number} 
            onChangeText={handleChange}
            placeHolder='DD/MM/AAAA'
            maxLength={10}/>
    );
};
export default DateBox;