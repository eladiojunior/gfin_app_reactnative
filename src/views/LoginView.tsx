import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import ViewBase from './ViewBase';
import { TextBox, TypesTextbox } from '../componentes/TextBox';
import Button from '../componentes/Button';
import Colors from '../constants/Colors';
import ViewsName from '../constants/ViewsName';

import repoUsuario from '../storage/repositores/UsuarioRepository';
import repoUsuarioLog from '../storage/repositores/UsuarioLogRepository';
import appStorage from '../storage/AppStorage';
import ReposStorage from '../constants/ReposStorage';
import UsuarioLogadoModel from '../storage/models/UsuarioLogadoModel';

const LoginView = ({ navigation }: any) => {
    const [email, onChangeEmail] = React.useState('');
    const [senha, onChangeSenha] = React.useState('');
    const [erros, setErros] = React.useState([]);

    const viewDashboard = ViewsName.viewsDrawers;
    const viewCadastro = ViewsName.viewCadastro;

    useEffect(() => {
        checkIfLoggedIn();
    }, []);
    const checkIfLoggedIn = async () => {
        try {
            appStorage.obter(ReposStorage.USUARIO_LOGADO, (usuarioLogado: any) => {
                if (usuarioLogado !== null)
                    navigation.navigate(viewDashboard);
            });
        } catch (error) {
            console.log('Erro ao verificar autenticação:', error);
        }
    };

    const validarForm = async () => {
        const arrayErrors = [];
        let usuario = null;

        if (!email) {
            arrayErrors.push('E-mail do usuário obrigatório.');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            arrayErrors.push('E-mail inválido, informe um válido.');
        }

        if (!senha) {
            arrayErrors.push('Senha obrigatória.');
        } else {
            try {
                usuario = await repoUsuario.obterPorEmail(email);
                if (!usuario) {
                    arrayErrors.push('Usuário ou senha inválidos.');
                } else if (usuario.senha !== senha) {
                    arrayErrors.push('Usuário ou senha inválidos.');
                    await repoUsuarioLog.registrar(usuario.id, 'Login', 'Senha inválida');
                }
            } catch (error) {
                arrayErrors.push('Erro: autenticar usuário.');
                console.log('Erro: ', error);
            };
        }
        
        setErros(arrayErrors);
        if (usuario!=null && arrayErrors.length === 0) {
            const moment = require('moment');
            const dataAtual = moment().format('YYYY-MM-DD HH:mm:ss');
            return new UsuarioLogadoModel(usuario.id, usuario.nome, usuario.email, usuario.dt_ultimo_login, dataAtual);
        }
        return null;

    };

    const handleLogin = async () => {

        const usuario = await validarForm();
        if (usuario === null) 
            return;

        //Registrar login...
        try {

            console.log('------- Registrar login -------');
            await repoUsuario.alterarUltimoLogin(usuario.id);

            await repoUsuarioLog.registrar(usuario.id, 'Login', 'Login do usuário realizado');
            
            // Armazenar usuário logado.
            await appStorage.gravar(ReposStorage.USUARIO_LOGADO, usuario, null);
            
            //Redirecionar para o Dashboard.
            navigation.navigate(viewDashboard);

        } catch (error) {
            console.error('Erro: ', error);
        }

    };

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
                    <View style={[styles.area_erros, { display: erros.length === 0 ? 'none' : 'flex' }]}>
                        {erros.map((error: string, index) => (
                            <Text key={index} style={styles.error}>{error}</Text>
                        ))}
                    </View>
                    <View style={styles.content_buttons}>
                        <Button label="Login" onClick={handleLogin}></Button>
                        <Button label="Cadastrar" onClick={() => navigation.navigate(viewCadastro)}></Button>
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
        paddingTop: 5,
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
    area_erros: {
        backgroundColor: Colors.bgColorError,
        borderRadius: 5,
        shadowColor: Colors.borderColorError,
        shadowOpacity: 1,
        elevation: 5,
        padding: 8
    },
    error: {
        color: Colors.textColorError,
        fontSize: 15,
    },
});