import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = (props:any) => {
  return (
    <View style={styles.drawerStyles}>
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerUser}>
                <Image source={require('../assets/images/img_usuario.png')} style={styles.drawerUserImage}/>
                <Text style={styles.drawerUserName}>Usário Logado</Text>
            </View>
            <View style={styles.drawerItens}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
        <View style={styles.drawerFooter}>
            <TouchableOpacity onPress={() => {console.log("Sair.")}} style={styles.drawerFooterButton}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name='exit-outline' size={22}/>
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