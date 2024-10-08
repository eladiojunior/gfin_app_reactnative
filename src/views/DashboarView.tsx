import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import Button from '../componentes/Button';
import CardConta from '../componentes/app/CardConta';
import CurrencyBox from '../componentes/CurrencyBox';
import { TextBox, TypesTextbox } from '../componentes/TextBox';
import DateBox from '../componentes/DateBox';
import CheckBox from '../componentes/CheckBox';
import { RadioBoxGroup } from '../componentes/RadioBoxGroup';
import Dropdown from '../componentes/Dropdown';
import Exemplo from './Exemplo';

const listaContas = [
    {
        id: '1',
        idTipo: 'D',
        descricaoNatureza: 'Educação',
        descricaoConta: 'Mensalidade do Marista 06.2024',
        dataConta: '10/07/2024',
        valorConta: 3850.00,
        hasLiquidada: false,
        hasVencida: false
    },
    {
        id: '2',
        idTipo: 'R',
        descricaoNatureza: 'Salários',
        descricaoConta: 'Salário da Mensal',
        dataConta: '08/07/2024',
        valorConta: 16001.01,
        hasLiquidada: false,
        hasVencida: false
    },
    {
        id: '3',
        idTipo: 'D',
        descricaoNatureza: 'Moradia',
        descricaoConta: 'Conta de Luz 06.2024',
        dataConta: '11/07/2024',
        valorConta: 480.00,
        hasLiquidada: true,
        hasVencida: false
    },
    {
        id: '4',
        idTipo: 'D',
        descricaoNatureza: 'Moradia',
        descricaoConta: 'Condomínio 06.2024',
        dataConta: '07/07/2024',
        valorConta: 1250.00,
        hasLiquidada: false,
        hasVencida: true
    }
]
const DashboardView = ({ navigation }: any) => {
    const [valor, setValor] = useState(0);
    const [data, setData] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.title]}>GFin - Gerenciador Financeiro</Text>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    {listaContas.map(i => {
                        return <CardConta key={i.id} data={i}></CardConta>
                    })}
                    <CurrencyBox value={valor} onChangeValor={setValor}/>
                    <DateBox valor={data} onChangeDate={setData}/>
                    <CheckBox/>
                    <RadioBoxGroup/>
                    <Dropdown 
                        selectedItem={selectedItem}
                        onChangeItem={(item:any) => setSelectedItem(item)}/>
                </View>
            </ScrollView>
            <View style={styles.button_flutuante}>
                <Button label="Nova Despesa" onClick={() => (console.log("Nova despesa..."))}/>
            </View>
        </View>
    );
}
export default DashboardView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColorApp,
        flex: 1,
    },
    button_flutuante: {
        position: 'absolute',
        bottom: 50,
        right: 30 
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
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
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