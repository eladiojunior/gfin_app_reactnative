import React, {useEffect, useLayoutEffect, useState} from 'react';
import {  StyleSheet, Text, ToastAndroid, View } from 'react-native';
import uuid from 'react-native-uuid';
import { RadioBoxGroup } from '../componentes/RadioBoxGroup';
import { TextBox } from '../componentes/TextBox';
import Button from '../componentes/Button';
import Repository from '../storage/AppStorage';
import ListaNaurezas from '../componentes/app/ListaNaurezas';
import Colors from '../constants/Colors';
const opcoesTipoNatureza = [
    { label: 'Despesa', value: '1' },
    { label: 'Receita', value: '2' }
]
export default function NaturezaView() {
    const [idTipo, setTipo] = useState('0');
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
        if (newNatureza.idTipo == "0") {
            showMessage("Regra: Tipo (Despesa ou Receita) obrigatório.");
        } else if (newNatureza.descricao == "") {
            showMessage("Regra: Descrição da natureza obrigatório.");
        } else {
            Repository.gravar(repo, newNatureza, (hasErro:boolean, erro:string) => {
                if (hasErro) {
                    showMessage("Erro no registro da Natureza.");
                } else {
                    showMessage("Natureza registrada com sucesso.");
                    cleanForm();
                }
            });
        }
        handleListData();
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
    useEffect(() => {
        handleListData();
        console.log('Teste')
    },[]);
    return (
    <View style={styles.container}>
        <View style={styles.content}>
            <Text style={[styles.text, styles.title]}>Precisa de uma nova natureza?</Text>
            <Text style={styles.text}>Informe os dados da nova natureza e clique em Gravar.</Text>
            <RadioBoxGroup data={opcoesTipoNatureza} value={idTipo} onSelected={ (item:any) => setTipo(item.value)}/>
            <TextBox placeHolder="Digite a descrição da natureza" value={descricao} onChangeText={setDescricao}/>
            <View style={styles.content_buttons}>
                <Button label="Gravar" onClick={handleRegistro}></Button>
            </View>
            <View style={styles.lista}>
                <ListaNaurezas data={lista} onClick={(item:any) => { console.log (item) }}/>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColorApp,
        flex: 1,
    },
    content: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        gap: 15,
    },
    content_buttons: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        color: "white",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '400',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.textColorTitulo
    },
    lista: {
        height: 300
    },
});