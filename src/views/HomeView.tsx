import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ViewBase from "./ViewBase";
import ViewsName from "../constants/ViewsName";
import Colors from "../constants/Colors";
import Button from "../componentes/Button";
import appStorage from '../storage/AppStorage';
import ReposStorage from "../constants/ReposStorage";

const HomeView = ({navigation}:any) => {
    const viewLogin = ViewsName.viewLogin;
    const viewCadastro = ViewsName.viewCadastro;
    const viewDashboard = ViewsName.viewsDrawers;
    useEffect(() => {
        checkIfLoggedIn();
    }, []);
    const checkIfLoggedIn = async () => {
        try {
            appStorage.obter(ReposStorage.USUARIO_LOGADO, (usuarioLogado: any) => {
                console.log('Logado: ' + usuarioLogado);
                if (usuarioLogado !== null)
                    navigation.navigate(viewDashboard);
            });
        } catch (error) {
            console.log('Erro ao verificar autenticação:', error);
        }
    };
    return (
        <View style={styles.container}>
            <ViewBase>
                <View style={styles.content}>
                    <Text style={[styles.text, styles.title]}>Boas-vindas!</Text>
                    <Text style={styles.text}>Que tal manter suas finanças controladas de forma simples e fácil? Aqui você consegue.</Text>
                    <View style={styles.content_buttons}>
                        <Button label="Login" onClick={() => navigation.navigate(viewLogin) }></Button>
                        <Button label="Cadastrar" onClick={() => navigation.navigate(viewCadastro) }></Button>
                    </View>
                </View>
                <View style={styles.content_versao_app}>
                    <Text style={styles.versao_app}>Versão 1.1.0</Text>
                </View>
            </ViewBase>
        </View>
    );
}
export default HomeView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColorApp,
        flex: 1,
    },
    content: {
        paddingLeft: 56,
        paddingRight: 56,
        paddingTop: 200,
        gap: 20,
    },
    content_buttons: {
        paddingTop: 50,
        gap: 20,
    },
    text: {
        color: "white",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '400',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.textColorTitulo
    },
    content_versao_app: {
        position: "absolute",
        bottom: 0,
        marginTop: 10,
        padding: 10,
        width: "100%",
    },
    versao_app: {
        color: Colors.textColorTitulo,
        fontSize: 16,
        textAlign: "center"
    }
});