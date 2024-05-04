import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Button from '../componentes/Button';
import Colors from '../constants/Colors';
import Dropdown from '../componentes/Dropdown';
import { AlingsTextbox, TextBox, TypesTextbox } from '../componentes/TextBox';
import CheckBox from '../componentes/CheckBox';
import { RadioBoxGroup, OrientationItens } from '../componentes/RadioBoxGroup';
import ListaContas from '../componentes/app/ListaContas';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewsName from '../constants/ViewsName';

import repoUsuario from '../storage/repositores/UsuarioRepository';

import Usuario from '../storage/models/UsuarioModel';

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
  { id: 6, descricao: 'Salario CASSI', valor: 15252.91, tipo: 'r' },
];

export default function Exemplo() {
  const [listaUsuario, setListaUsuarios] = useState([]);

  const registrarUsuario = async () => {
    const usuario = new Usuario(0, 'Eladio Júnior', 'eladiojunior@gmail.com', '123456', '654321', null, null, null);
    try {
      await repoUsuario.registrar(usuario);
      listarUsuarios();
    } catch (error) {
      console.log('Erro' + error);
    };

  };
  const excluirUsuario = async (id: any) => {
    try {
      await repoUsuario.excluir(id);
      listarUsuarios();
    } catch (error) {
      console.log('Erro' + error);
    }
  };
  const listarUsuarios = async () => {
    try {
      const lista = await repoUsuario.listar();
      console.log(lista?.length);
      setListaUsuarios(lista);
    } catch (error) {
      console.log('Erro' + error);
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, [listarUsuarios]);

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>

      <Text style={styles.title}>Exemplos</Text>

      <View style={styles.container_lista}>
        <Text>{listaUsuario.length}</Text>
        <ScrollView>
          {listaUsuario.map((item: Usuario) => {
            return (
              <View key={item.id}>
                <View style={styles.item_lista_linha}>
                  <View style={[styles.item_lista_coluna, { width: '20%' }]}>
                    <Text style={styles.item_lista_coluna_text}>{item.id}</Text>
                  </View>
                  <View style={[styles.item_lista_coluna, { width: '80%' }]}>
                    <Text style={styles.item_lista_coluna_text}>{item.nome}</Text>
                  </View>
                </View>
                <View style={styles.item_lista_linha}>
                  <View style={[styles.item_lista_coluna, { width: '100%' }]}>
                    <Text style={styles.item_lista_coluna_text}>{item.email}</Text>
                  </View>
                </View>
                <View style={styles.item_lista_linha}>
                  <View style={[styles.item_lista_coluna, { width: '40%' }]}>
                    <Text style={styles.item_lista_coluna_text}>{item.dt_registro}</Text>
                  </View>
                  <View style={[styles.item_lista_coluna, { width: '40%' }]}>
                    <Text style={styles.item_lista_coluna_text}>{item.dt_ultimo_login}</Text>
                  </View>
                  <View style={[styles.item_lista_coluna, { width: '20%' }]}>
                    <TouchableHighlight onPress={() => { excluirUsuario(item.id) }}>
                      <Text>REM</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <Button label="Registrar Usuário" onClick={registrarUsuario} />

    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container_lista: {
    flex: 1,
    backgroundColor: Colors.bgColorLista,
    borderWidth: 1,
    borderColor: '#000000',
    width: '100%'
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
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.bgColorApp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    color: '#FFFFFF'
  },
  input: {

  }
});