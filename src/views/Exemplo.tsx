import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
  const [listaUsuario, setListaUsuarios] = React.useState([]);
  
  const testeDbUsuarios = () => {

    console.log("-------------------------");
    repoUsuario.listar().then(lista => {
      setListaUsuarios(lista);
    });
    console.log(listaUsuario);

    //Registrar usuário
    const usuario = new UsuarioModel(0, 'Eladio Júnior', 'eladiojunior@gmail.com', '123456', '654321', null, null);
    repoUsuario.registrar(usuario);

    console.log("-------------------------");
    repoUsuario.listar().then(lista => {
      setListaUsuarios(lista);
    });
    console.log(listaUsuario);

    console.log("-------------------------");
    
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>

      <Text style={styles.title}>Exemplos</Text>

      <ListaContas height={150} data={listaContas} onClick={(item: any) => { console.log(item) }} />

      <CheckBox onSelected={(value: any) => console.log(value)} label="Teste" />

      <RadioBoxGroup
        data={dataRadio} labelField="text" valueField="id"
        orientationItens={OrientationItens.Vertical} onSelected={(item: any) => console.log(item.id)}
        valueItem="03" />

      <TextBox
        typeTextbox={TypesTextbox.Alfanumber}
        placeHolder="Informe um texto"
        autoComplete="name"
        value="Text"
        width={250}
        onChangeText={(text: string) => console.log(text)} />

      <TextBox
        typeTextbox={TypesTextbox.Number}
        placeHolder="0"
        alingText={AlingsTextbox.Center}
        value="0"
        width={50}
        onChangeText={(text: string) => console.log(text)} />

      <TextBox
        typeTextbox={TypesTextbox.Email}
        placeHolder="Seu e-mail"
        alingText={AlingsTextbox.Left}
        width={250}
        onChangeText={(text: string) => console.log(text)} />

      <TextBox
        typeTextbox={TypesTextbox.Password}
        placeHolder="Sua senha"
        alingText={AlingsTextbox.Left}
        width={250}
        onChangeText={(text: string) => console.log(text)} />

      <TextBox
        typeTextbox={TypesTextbox.Number}
        placeHolder="Valor despesa"
        alingText={AlingsTextbox.Right}
        width={250}
        onChangeText={(text: string) => console.log(text)} />

        <Button label="Teste Conectar Banco" onClick={() => { testeDbUsuarios() }} />

    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
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