import React, {useLayoutEffect, useState} from 'react';
import {  StyleSheet, Text, ToastAndroid, View } from 'react-native';
import uuid from 'react-native-uuid';
import { RadioBoxGroup } from '../componentes/RadioBoxGroup';
import { TextBox } from '../componentes/TextBox';
import Button from '../componentes/Button';
import Repository from '../storage/AppStorage';
import ListaNaurezas from '../componentes/app/ListaNaurezas';
const opcoesTipoNatureza = [
    { label: 'Despesa', value: '1' },
    { label: 'Receita', value: '2' }
]
export default function FormNatureza() {
    const [idTipo, setTipo] = useState('1');
    const [descricao, setDescricao] = useState('');
    const [lista, setLista] = useState([]);
    const repo = 'naturezas';

    function handleRegistro() {
        const id = uuid.v4();
        const newNatureza = {
            id,
            idTipo,
            descricao
        }
        Repository.gravar(repo, newNatureza, (hasErro:boolean, erro:string) => {
            if (hasErro) {
                showMessage("Erro no registro da Natureza.");
                console.log(erro);
            } else {
                showMessage("Natureza registrada com sucesso.");
                cleanForm();
            }
        });
    }
    function handleListData() {
        Repository.listar(repo, (itens:any) => {
            setLista(itens);
        });
        
    }
    const showMessage = (mensagem:string) => {
        ToastAndroid.show(mensagem, ToastAndroid.SHORT);
    };
    const cleanForm = () => {
        setTipo('0');
        setDescricao('');
    };
    useLayoutEffect(() => {
        handleListData();
    },[]);
    return (
    <View style={styles.container}>
        <RadioBoxGroup data={opcoesTipoNatureza} value={idTipo} onSelected={ (item:any) => setTipo(item.value)}/>
        <TextBox style={styles.input} placeHolder="Descrição da natureza" value={descricao} onChangeText={setDescricao}/>
        <Button label="Gravar" onClick={handleRegistro}/>
        <View style={styles.lista}>
            <ListaNaurezas data={lista}/>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#168CA6',
    },
    lista: {
        margin: 15,
        height: '60%',
        borderWidth: 1
    },
    input: {
        margin: 15,
        width: 'auto'
    }
});