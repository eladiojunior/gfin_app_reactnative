import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';

//Views
import ViewsName from "../../constants/ViewsName";
import HomeView from "../../views/HomeView";
import CadastroView from "../../views/CadastroView";
import LoginView from "../../views/LoginView";
import DashboardView from '../../views/DashboarView';
import PerfilUsuarioView from '../../views/PerfilUsuarioView';
import ConfiguracoesView from '../../views/ConfiguracoesView';
import { Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import SobreAplicacaoView from '../../views/SobreAplicacaoView';
import DespesasView from '../../views/DespesasView';
import ReceitasView from '../../views/ReceitasView';
import CustomDrawer from '../CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Exemplo from '../../views/Exemplo';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer { ...props} />}
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: 'slide',
        headerTintColor: Colors.textColorDrawer,
        drawerLabelStyle: {
          fontSize: 16,
          color: Colors.textColorDrawer,
          marginLeft: -25
        },
        headerTransparent: true, title: '',
        drawerActiveBackgroundColor: Colors.bgColorDrawerActive,
        drawerActiveTintColor: Colors.textColorDrawerActive,
        drawerInactiveTintColor: Colors.textColorDrawerInactive
      }}>
      <Drawer.Screen name={ViewsName.viewDashboard} component={DashboardView}
        options={{
          drawerLabel: "Dashboard",
          drawerIcon: ({color}) => (<Ionicons name='home' size={22} color={color}/>)
        }} />
      <Drawer.Screen name={ViewsName.viewDespesas} component={DespesasView}
        options={{
          drawerLabel: "Listar Despesas",
          drawerIcon: ({color}) => (<Ionicons name='trending-down' size={22} color={color}/>)
        }} />
      <Drawer.Screen name={ViewsName.viewReceitas} component={ReceitasView}
        options={{
          drawerLabel: "Listar Receitas",
          drawerIcon: ({color}) => (<Ionicons name='trending-up' size={22} color={color}/>)
        }} />
      <Drawer.Screen name={ViewsName.viewPerfilUsuario} component={PerfilUsuarioView}
        options={{
          drawerLabel: "Perfil do Usuário",
          drawerIcon: ({color}) => (<Ionicons name='id-card-outline' size={22} color={color}/>)
        }} />
      <Drawer.Screen name={ViewsName.viewConfiguracao} component={ConfiguracoesView}
        options={{
          drawerLabel: "Configurações",
          drawerIcon: ({color}) => (<Ionicons name='settings-outline' size={22} color={color}/>)
        }} />
      <Drawer.Screen name={ViewsName.viewSobreAplicacao} component={Exemplo}
        options={{
          drawerLabel: "Sobre a Aplicação",
          drawerIcon: ({color}) => (<Ionicons name='help-circle-outline' size={22} color={color}/>)
        }} />
    </Drawer.Navigator>
  );
}
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ViewsName.viewHome}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ViewsName.viewHome} component={HomeView} />
        <Stack.Screen name={ViewsName.viewLogin} component={LoginView} />
        <Stack.Screen name={ViewsName.viewCadastro} component={CadastroView} />
        <Stack.Screen name={ViewsName.viewsDrawers} component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation;

const styles = StyleSheet.create({
  drawerStyles: {
    width: 260,
    backgroundColor: Colors.bgColorDrawer
  }
});