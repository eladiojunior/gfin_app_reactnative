import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ViewBase from "./ViewBase";
import Colors from "../constants/Colors";
import Button from "../componentes/Button";
import { TextBox, TypesTextbox } from "../componentes/TextBox";

const CadastroView = (navigation:any) => {
    const [nome, onChangeNome] = React.useState('');
    const [senha, onChangeSenha] = React.useState('');
    const [confirmaSenha, onChangeConfirmaSenha] = React.useState('');
    const [email, onChangeEmail] = React.useState('');

    return (
        <View style={styles.container}>
            <ViewBase>
                <View style={styles.content}>
                    <View>
                        <Text style={[styles.text, styles.title]}>Ainda não tem cadastro?</Text>
                        <Text style={styles.text}>Então, antes de controlar suas finanças, precisamos de alguns dados:</Text>
                    </View>
                    <TextBox onChangeText={onChangeNome} value={nome} placeHolder='Digite seu nome completo'></TextBox>
                    <TextBox onChangeText={onChangeEmail} value={email} typeTextbox={TypesTextbox.Email} placeHolder='Digite seu meelhor e-mail'></TextBox>
                    <TextBox onChangeText={onChangeSenha} value={senha} typeTextbox={TypesTextbox.Password} placeHolder='Crie uma senha forte'></TextBox>
                    <TextBox onChangeText={onChangeConfirmaSenha} value={confirmaSenha} typeTextbox={TypesTextbox.Password} placeHolder='Repita a senha criada acima'></TextBox>
                    <View style={styles.content_buttons}>
                        <Button label="Cadastrar" onClick={() => { console.log("Cadastrar") }}></Button>
                    </View>
                </View>
            </ViewBase>
        </View>
    );
}
export default CadastroView;

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
    imagem: {
        alignSelf: 'center',
        width: 100,
        height: 100
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