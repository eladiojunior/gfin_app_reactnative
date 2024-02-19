import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";

const _ = require('lodash');
const listaDefault = [
    {
        id: 1,
        descricao: 'Item de despesa',
        valor: 1.99,
        tipo: 'D'
    },
    {
        id: 2,
        descricao: 'Item de receita',
        valor: 1.98,
        tipo: 'R'
    },
];
const ListaContas = (props: any) => {
    const {
        idItemField = 'id', //Nome da propriedade com o ID da lista
        data =  listaDefault , //Lista de contas (despesas ou receitas)
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
    
    const formatarValor = (valor: number) => {
        let result = valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
        return result;
    };

    const tipoConta = (tipo: string) => {
        let result = '';
        if (isDespesa(tipo)) {
            result = '(-)';
        } else if (isReceita(tipo)) {
            result = '(+)';
        }
        return result;
    };

    const isDespesa = (tipo: string) => {
        return (tipo === 'D' || tipo === 'd');
    };
    const isReceita = (tipo: string) => {
        return (tipo === 'R' || tipo === 'r');
    };

    const _renderItemLista = (item: any) => {
        const idItemLista = _.get(item, idItemField);
        return (
            <TouchableOpacity key={idItemLista} onPress={() => onSelectedItem(item)}>
                <View style={StyleSheet.flatten([styles.item_lista_linha, isDespesa(item.tipo) ? styles.item_lista_d : styles.item_lista_r])}>
                    <View style={[styles.item_lista_coluna, {width: '65%'}]}>
                        <Text style={styles.item_lista_coluna_text}>{item.descricao}</Text>
                    </View>
                    <View style={[styles.item_lista_coluna, {width: '25%', alignItems: 'flex-end'}]}>
                        <Text style={styles.item_lista_coluna_text}>{formatarValor(item.valor)}</Text>
                    </View>
                    <View style={[styles.item_lista_coluna, {width: '10%', alignItems: 'center'}]}>
                        <Text style={styles.item_lista_coluna_text}>{tipoConta(item.tipo)}</Text>
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
        flex: 1,
        backgroundColor: Colors.bgColorLista,
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
export default ListaContas;