import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../componentes/Button';
import Colors from '../constants/Colors';
import Dropdown from '../componentes/Dropdown';

const data = [
  { label: 'janeiro/2024',    value: '01/01/2024' },
  { label: 'fevereiro/2024',  value: '01/02/2024' },
  { label: 'março/2024',      value: '01/03/2024' },
  { label: 'abril/2024',      value: '01/04/2024' },
  { label: 'maio/2024',       value: '01/05/2024' },
  { label: 'junho/2024',      value: '01/06/2024' },
  { label: 'julho/2024',      value: '01/07/2024' },
  { label: 'agosto/2024',     value: '01/08/2024' },
  { label: 'setembro/2024',   value: '01/09/2024' },
  { label: 'outubro/2024',    value: '01/10/2024' },
  { label: 'novembro/2024',   value: '01/11/2024' },
  { label: 'dezembro/2024',   value: '01/12/2024' }
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <Dropdown data={data} width={250} valueItem="01/11/2024" onChange={(item: any) => { console.log("Dropbox onChange." + item.value)}}/>

      <Button label="Gravar Registro " onClick={() => { console.log("Button onClick.") }}/>

    </View>
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
});