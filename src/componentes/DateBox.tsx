import { useState } from "react";
import { AlingsTextbox, TextBox, TypesTextbox } from "./TextBox";

const DateBox = (props: any) => {
    const {
        placeHolder = '',
        autoComplete = 'off',
        value = props.value,
    } = props;

    const formatDate = (value: string) => {
        if (value.length <= 2) return value;
        if (value.length <= 4) return `${value.slice(0, 2)}/${value.slice(2)}`;
        return `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    };

    const handleChange = (value: string) => {
        const dateValue = value.replace(/[^0-9]/g, '');
        console.log(dateValue);
        const formattedDate = formatDate(dateValue);
        setCurrentValue(formattedDate);
        if (props.onChangeDate) {
            props.onChangeDate(formattedDate);
        }
    };
    
    const [currentValue, setCurrentValue] = useState(formatDate(value));

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