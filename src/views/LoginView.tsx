import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ViewBase from './ViewBase';
import { TextBox, TypesTextbox } from '../componentes/TextBox';
import Button from '../componentes/Button';
import Colors from '../constants/Colors';
import ViewsName from '../constants/ViewsName';

const LoginView = ({navigation}:any) => {
  const [email, onChangeEmail] = React.useState('');
  const [senha, onChangeSenha] = React.useState('');
  const viewsDrawers = ViewsName.viewsDrawers;
  const viewCadastro = ViewsName.viewCadastro;
  return (
      <View style={styles.container}>
          <ViewBase>
              <View style={styles.content}>
                  <View>
                      <Text style={[styles.text, styles.title]}>Login de Acesso</Text>
                      <Text style={styles.text}>Para acessar, informe seu e-mail e senha!</Text>
                  </View>
                  <TextBox onChangeText={onChangeEmail} value={email} typeTextbox={TypesTextbox.Email} placeHolder='Seu e-mail de login'></TextBox>
                  <TextBox onChangeText={onChangeSenha} value={senha} typeTextbox={TypesTextbox.Password} placeHolder='Sua senha de login'></TextBox>
                  <View style={styles.content_buttons}>
                      <Button label="Login" onClick={() => { navigation.navigate(viewsDrawers) }}></Button>
                      <Button label="Cadastrar" onClick={() => navigation.navigate(viewCadastro) }></Button>
                  </View>
              </View>
          </ViewBase>
      </View>
  );
}
export default LoginView;

const styles = StyleSheet.create({
  container: {
      backgroundColor: Colors.bgColorApp,
      flex: 1,
  },
  content: {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 180,
      gap: 16,
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