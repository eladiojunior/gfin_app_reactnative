import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import ViewBase from "./ViewBase";
import Colors from "../constants/Colors";
import Button from "../componentes/Button";
import { TextBox, TypesTextbox } from "../componentes/TextBox";
import ViewsName from "../constants/ViewsName";

import Usuario from '../storage/models/UsuarioModel';
import repoUsuario from '../storage/repositores/UsuarioRepository';
import repoUsuarioLog from '../storage/repositores/UsuarioLogRepository';

import appStorage from '../storage/AppStorage';
import ReposStorage from '../constants/ReposStorage';
import UsuarioLogadoModel from "../storage/models/UsuarioLogadoModel";

const CadastroView = ({ navigation }: any) => {
    const [nome, onChangeNome] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [senha, onChangeSenha] = React.useState('');
    const [confirmaSenha, onChangeConfirmaSenha] = React.useState('');
    const [errors, setErrors] = React.useState([]);

    const viewLogin = ViewsName.viewLogin;
    const viewDashboard = ViewsName.viewsDrawers;

    const validarForm = async () => {
        const arrayErrors = [];

        if (!nome) {
            arrayErrors.push('Nome completo obrigatório.');
        }

        if (!email) {
            arrayErrors.push('E-mail do usuário obrigatório.');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            arrayErrors.push('E-mail inválido, informe um válido.');
        } else {
            try {
                const usuario = await repoUsuario.obterPorEmail(email);
                if (usuario && usuario.email === email) {
                    arrayErrors.push('E-mail já registrado, realize o login.');
                }
            } catch (error) {
                arrayErrors.push('Erro ao verificar o usuario pelo e-mail.');
            }
        }

        if (!senha) {
            arrayErrors.push('Senha obrigatória.');
        } else if (senha.length < 8) {
            arrayErrors.push('Senha deve ser maior que 8 caracteres.');
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(senha)) {
            arrayErrors.push('Senha deve ser forte: números, letras (maiúsculo e minusculo) e caracteres especiais.');
        }

        if (!confirmaSenha) {
            arrayErrors.push('Confirmação de senha obrigatória.');
        } else if (senha !== confirmaSenha) {
            arrayErrors.push('Confirmação da senha não confere, verifique.');
        }

        setErrors(arrayErrors);
        return (arrayErrors.length === 0);

    };

    const handleRegistrar = async () => {
        
        const isValid = await validarForm();
        if (!isValid) {
            return;
        }

        //Registrar usuário
        let usuario = new Usuario(0, nome, email, senha, senha, null, null, null);
        try {
            console.log('------- Registrar usuario -------');
            const idUsuario = await repoUsuario.registrar(usuario);
            if (idUsuario != 0) {
                await repoUsuarioLog.registrar(idUsuario, 'Usuario', 'Cadastro realizado');
                const moment = require('moment');
                const dataAtual = moment().format('YYYY-MM-DD HH:mm:ss');
                // Armazenar usuário logado.
                const usuarioLogado = new UsuarioLogadoModel(idUsuario, nome, email, dataAtual, dataAtual);
                await appStorage.gravar(ReposStorage.USUARIO_LOGADO, usuarioLogado, null);
                //Redirecionar para o Dashboard.
                navigation.navigate(viewDashboard);
            }
        } catch (error) {
            Alert.alert('Erro', 'Usuário não cadastrado.');
        }
    };

    return (
        <View style={styles.container}>
            <ViewBase>
                <ScrollView>
                    <View style={styles.content}>
                        <View>
                            <Text style={[styles.text, styles.title]}>Ainda não tem cadastro?</Text>
                            <Text style={styles.text}>Então, antes de controlar suas finanças, precisamos de alguns dados:</Text>
                        </View>
                        <TextBox onChangeText={onChangeNome} value={nome} placeHolder='Digite seu nome completo'></TextBox>
                        <TextBox onChangeText={onChangeEmail} value={email} typeTextbox={TypesTextbox.Email} placeHolder='Digite seu melhor e-mail'></TextBox>
                        <TextBox onChangeText={onChangeSenha} value={senha} typeTextbox={TypesTextbox.Password} placeHolder='Crie uma senha forte'></TextBox>
                        <TextBox onChangeText={onChangeConfirmaSenha} value={confirmaSenha} typeTextbox={TypesTextbox.Password} placeHolder='Repita a senha criada acima'></TextBox>
                        <View style={[styles.area_erros, {display: Object.keys(errors).length === 0 ? 'none' : 'flex'}]}>
                            {Object.values(errors).map((error: any, index) => (
                                <Text key={index} style={styles.error}>{error}</Text>
                            ))}
                        </View>
                        <View style={styles.content_buttons}>
                            <Button label="Registrar" onClick={handleRegistrar}></Button>
                            <Button label="Voltar" onClick={() => { navigation.navigate(viewLogin) }}></Button>
                        </View>
                    </View>
                </ScrollView>
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
        gap: 15,
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
    area_erros: {
        backgroundColor: Colors.bgColorError,
        borderRadius: 5,
        shadowColor: Colors.borderColorError,
        shadowOpacity: 1,
        elevation: 5,
        padding: 5
    },
    error: {
        color: Colors.textColorError,
        fontSize: 15,
        marginBottom: 5,
    },
});