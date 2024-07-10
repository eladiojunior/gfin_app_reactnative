import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import CurrencyText from "../CurrencyText";

const infoContaDefault = 
{
    id: '1',
    idTipo: 'D',
    descricaoNatureza: 'Natureza',
    descricaoConta: 'Descrição da conta despesa ou receita',
    dataConta: '01/01/2024',
    valorConta: 1000.99,
    hasLiquidada: false,
    hasVencida: false
};
const CardConta = (props: any) => {
    const {
        data = infoContaDefault, //Dados da Conta (despesas ou receitas)
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
        return (tipo === 'D');
    };
    const isReceita = (tipo: string) => {
        return (tipo === 'R');
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      };

    const _renderCardConta = (item: any) => {
        return (
            <TouchableOpacity onPress={() => onSelectedItem(item)}>
                <View style={[styles.area_conta, isDespesa(item.idTipo) ? styles.area_conta_d : styles.area_conta_r]}>
                    <Text>{tipoConta(item.idTipo)}: {item.descricaoNatureza}</Text>
                    <Text>{item.descricaoConta}</Text>
                    <View style={[styles.marcador_conta, item.hasLiquidada ? styles.marcador_conta_liquidada : (item.hasVencida ? styles.marcador_conta_vencida : null)]}></View>
                    <View style={styles.area_data_valor_conta}>
                        <Text>Data: {item.dataConta}</Text>
                        <CurrencyText value={item.valorConta}></CurrencyText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {_renderCardConta(data)}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColorLista,
        flex: 1
    },
    area_conta: {
        padding: 5,
        marginBottom: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderTopColor: Colors.borderColorCardConta,
        borderBottomColor: Colors.borderColorCardConta,
        borderRightColor: Colors.borderColorCardConta,
        backgroundColor: Colors.bgColorCardConta,
        borderLeftWidth: 5,
        fontSize: 16,
        color: Colors.textColorCardConta
    },
    area_conta_d: {
        borderLeftColor: Colors.borderColorDespesa
    },
    area_conta_r: {
        borderLeftColor: Colors.borderColorReceita
    },
    marcador_conta: {
        width: 15,
        height: 15,
        borderRadius: 15,
        position: "absolute",
        top: 5,
        right: 5
    },
    marcador_conta_liquidada: {
        backgroundColor: Colors.bgColorContaLiquidada,
    },
    marcador_conta_vencida: {
        backgroundColor: Colors.bgColorContaVencida,
    },
    area_data_valor_conta: {
        flexDirection: 'row',
        justifyContent: "space-between"
    }
});
export default CardConta;