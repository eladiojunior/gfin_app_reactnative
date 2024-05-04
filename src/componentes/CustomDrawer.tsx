import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import appStorage from '../storage/AppStorage';
import ReposStorage from '../constants/ReposStorage';
import ViewsName from '../constants/ViewsName';

const CustomDrawer = (props: any) => {
    const [idUsuario, setIdUsuario] = React.useState('');
    const [nomeUsuario, setNomeUsuario] = React.useState('');
    const [emailUsuario, setEmailUsuario] = React.useState('');
    const [dataUltimoAcessoUsuario, setDataUltimoAcessoUsuario] = React.useState('');
    
    const viewLogin = ViewsName.viewLogin;

    useEffect(() => {
        checkIfLoggedIn();
    }, []);
    const checkIfLoggedIn = async () => {
        try {
            appStorage.obter(ReposStorage.USUARIO_LOGADO, (usuario: any) => {
                if (usuario!=null) {
                    console.log(usuario);
                    setIdUsuario(usuario.id);
                    setEmailUsuario(usuario.email);
                    setNomeUsuario(usuario.nome);
                    setDataUltimoAcessoUsuario(usuario.dataUltimoAcesso);
                }
            });
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
        }
    };

    return (
        <View style={styles.drawerStyles}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerUser}>
                    <Image source={require('../assets/images/img_usuario.png')} style={styles.drawerUserImage} />
                    <Text style={styles.drawerUserName}>{nomeUsuario}</Text>
                </View>
                <View style={styles.drawerItens}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.drawerFooter}>
                <TouchableOpacity onPress={() => {
                    appStorage.removerTudo(ReposStorage.USUARIO_LOGADO);
                    //Redirecionar para o Login.
                    props.navigation.navigate(viewLogin);
                }} style={styles.drawerFooterButton}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='exit-outline' size={22} />
                        <Text style={styles.drawerFooterButtonText}>Sair da aplicação</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.drawerFooterButtonText}>Versão 1.1.0</Text>
            </View>
        </View>
    );
}
export default CustomDrawer;

const styles = StyleSheet.create({
    drawerStyles: {
        flex: 1
    },
    drawerUser: {
        backgroundColor: Colors.bgColorDrawerUser,
        padding: 20
    },
    drawerUserImage: {
        height: 60,
        width: 60,
        borderRadius: 40,
        marginBottom: 10
    },
    drawerUserName: {
        color: Colors.textColorDrawerUser,
        fontSize: 16
    },
    drawerItens: {
        flex: 1,
        paddingTop: 10
    },
    drawerFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.borderColorDrawerFooter
    },
    drawerFooterButton: {
        paddingVertical: 15
    },
    drawerFooterButtonText: {
        fontSize: 16,
        marginLeft: 5,
        color: Colors.textColorDrawerButton,
    }
});