import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Share, Alert } from 'react-native';
import Colors from '../constants/Colors';
import Config from '../constants/Messages';
import Button from '../componentes/Button';

const SobreAplicacaoView = ({ navigation }: any) => {
    const sharePixCode = async () => {
        try {
          await Share.share({
            message: `Meu código PIX é: ${Config.pixCodeApp}`,
          });
        } catch (error) {
          Alert.alert('Erro', 'Ocorreu um erro ao tentar compartilhar o código PIX.');
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.title]}>GFin - Gerenciador Financeiro</Text>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <Image source={require('../assets/images/logo_app.png')} style={styles.logoApp} />
                    <Text style={[styles.text, styles.title]}>Versão {Config.labelVersaoApp}</Text>
                    <Text style={styles.text}>{Config.labelSobreApp}</Text>
                    <View>
                        <Image source={require('../assets/images/img_pix_app.png')} style={styles.pixApp} />
                        <Button label="Copiar ou Compartilhar PIX" onClick={sharePixCode}></Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
export default SobreAplicacaoView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColorApp,
        flex: 1,
    },
    header: {
        paddingTop: 13,
        backgroundColor: Colors.bgColorHeader,
        alignItems: 'center',
        textAlign: 'center',
        shadowColor: Colors.borderColorHeader,
        shadowOpacity: 1,
        elevation: 5,
        height: 55
    },
    content: {
        padding: 10,
        alignItems: 'center',
    },
    text: {
        color: Colors.textColorSobreApp,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '400',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.textColorTitulo
    },
    logoApp: {
        width: 250,
        height: 100,
        resizeMode: 'contain',
        marginTop: 20,
        marginBottom: 10,
    },
    pixApp: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
        borderColor: Colors.borderColorPix,
        borderWidth: 2,
    },
});