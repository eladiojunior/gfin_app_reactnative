import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";

const _ = require('lodash');
const listaDefault = [
    {
        id: '1',
        descricao: 'Natureza de despesa',
        idTipo: 'D'
    },
    {
        id: '',
        descricao: 'Natureza de receita',
        idTipo: 'R'
    },
];
const ListaNaurezas = (props: any) => {
    const {
        idItemField = 'id', //Nome da propriedade com o ID da lista
        data = listaDefault , //Lista de contas (despesas ou receitas)
        height = 50,
        onClick = null,
    } = props;

    // States
    const [currentValue, setCurrentValue] = useState<any>(null);

    const onSelectedItem = (item: any) => {
        if (props.onClick) {
            props.onClick(item);
        }
        setCurrentValue(item);
    };
    
    const tipoConta = (tipo: string) => {
        let result = '';
        if (isDespesa(tipo)) {
            result = 'Despesa';
        } else if (isReceita(tipo)) {
            result = 'Receita';
        }
        return result;
    };

    const isDespesa = (tipo: string) => {
        return (tipo === '1');
    };
    const isReceita = (tipo: string) => {
        return (tipo === '2');
    };

    const _renderItemLista = (item: any) => {
        const idItemLista = _.get(item, idItemField);
        return (
            <TouchableOpacity key={idItemLista} onPress={() => onSelectedItem(item)}>
                <View style={StyleSheet.flatten([styles.item_lista_linha, isDespesa(item.idTipo) ? styles.item_lista_d : styles.item_lista_r])}>
                    <View style={[styles.item_lista_coluna, {width: '70%'}]}>
                        <Text style={styles.item_lista_coluna_text}>{item.descricao}</Text>
                    </View>
                    <View style={[styles.item_lista_coluna, {width: '30%', alignItems: 'center'}]}>
                        <Text style={styles.item_lista_coluna_text}>{tipoConta(item.idTipo)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, {minHeight: props.height}]}>
            <ScrollView>
            {data.map((item: any) => {
                return (_renderItemLista(item));
            })}
            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColorLista,
        flex: 1
    },
    item_lista_d: {
        backgroundColor: Colors.bgColorDespesa,
        color: Colors.textColorDespesa,
    },
    item_lista_r: {
        backgroundColor: Colors.bgColorReceita,
        color: Colors.textColorReceita,
    },
    item_lista_linha: {
        flexDirection: 'row',
        padding: 5,
        marginBottom: 2,
        borderRadius: 5,
    },
    item_lista_coluna: {
        minWidth: 10,
    },
    item_lista_coluna_text: {
        fontSize: 16,
        color: Colors.textColorLista,
    }

});
export default ListaNaurezas;