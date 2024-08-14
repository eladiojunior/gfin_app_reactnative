import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const dataDropbox = [
  { label: 'janeiro/2024', value: '01/01/2024' },
  { label: 'fevereiro/2024', value: '01/02/2024' },
  { label: 'março/2024', value: '01/03/2024' },
  { label: 'abril/2024', value: '01/04/2024' },
  { label: 'maio/2024', value: '01/05/2024' },
  { label: 'junho/2024', value: '01/06/2024' },
  { label: 'julho/2024', value: '01/07/2024' },
  { label: 'agosto/2024', value: '01/08/2024' },
  { label: 'setembro/2024', value: '01/09/2024' },
  { label: 'outubro/2024', value: '01/10/2024' },
  { label: 'novembro/2024', value: '01/11/2024' },
  { label: 'dezembro/2024', value: '01/12/2024' }
];
const dataRadio = [
  { text: 'Testando Radio 01', id: '01' },
  { text: 'Testando Radio 02', id: '02' },
  { text: 'Testando Radio 03', id: '03' },
];
const listaContas = [
  { id: 1, descricao: 'Mensalidade do Marista 01/2024', valor: 1501.91, tipo: 'D' },
  { id: 2, descricao: 'Salario', valor: 1.91, tipo: 'R' },
  { id: 3, descricao: 'Mensalidade UBT', valor: 350.00, tipo: 'D' },
  { id: 4, descricao: 'Fatura da IO', valor: 352.88, tipo: 'd' },
  { id: 5, descricao: 'Boleto do Condomínio 01/2024', valor: 1350.00, tipo: 'D' },
  { id: 6, descricao: 'Salario Mensal', valor: 15252.91, tipo: 'r' },
];

export default function Exemplo() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});