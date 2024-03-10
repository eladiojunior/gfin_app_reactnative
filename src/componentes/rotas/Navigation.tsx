import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Views
import ViewsName from "../../constants/ViewsName";
import HomeView from "../../views/HomeView";
import CadastroView from "../../views/CadastroView";
import LoginView from "../../views/LoginView";
import DashboardView from '../../views/DashboarView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PerfilUsuarioView from '../../views/PerfilUsuarioView';
import ConfiguracoesView from '../../views/ConfiguracoesView';
import { Image, Platform, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import SobreAplicacaoView from '../../views/SobreAplicacaoView';
import DespesasView from '../../views/DespesasView';
import ReceitasView from '../../views/ReceitasView';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName={ViewsName.viewDashboard}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.textColorTabAtive, tabBarInactiveTintColor: Colors.textColorTabInative,
        tabBarActiveBackgroundColor: Colors.bgColorTabAtive, tabBarInactiveBackgroundColor: Colors.bgColorTabInative,
        tabBarLabelStyle: { fontSize: 13, paddingBottom: 5 }, tabBarIconStyle: { paddingTop: 5 }, tabBarStyle: { height: 60 }
      }}>
      <Tab.Screen name={ViewsName.viewDashboard} component={DashboardView}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: (item) => (<Image source={item.focused ? require('../../assets/images/icon_inicio_on.png') : require('../../assets/images/icon_inicio_off.png')} style={{ width: 30, height: 30 }} />)
        }} />
      <Tab.Screen name={ViewsName.viewPerfilUsuario} component={PerfilUsuarioView}
        options={{
          tabBarLabel: "Perfil Usuário",
          tabBarIcon: (item) => (<Image source={item.focused ? require('../../assets/images/icon_perfilusuario_on.png') : require('../../assets/images/icon_perfilusuario_off.png')} style={{ width: 30, height: 30 }} />),
        }} />
      <Tab.Screen name={ViewsName.viewConfiguracao} component={ConfiguracoesView}
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: (item) => (<Image source={item.focused ? require('../../assets/images/icon_configuracao_on.png') : require('../../assets/images/icon_configuracao_off.png')} style={{ width: 30, height: 30 }} />),
        }} />
    </Tab.Navigator>
  );
}
function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: 'slide',
        headerTintColor: Colors.textColorDrawer,
        drawerLabelStyle: {
          fontSize: 16,
          color: Colors.textColorDrawer
        },
        headerTransparent: true, title: '',
        drawerActiveBackgroundColor: Colors.bgColorDrawerActive
      }}>
      <Drawer.Screen name={ViewsName.viewDashboard} component={DashboardView} 
        options={{
          drawerLabel: "Dashboard",
          drawerIcon: () => (<Image source={require('../../assets/images/icon_inicio_on.png')} style={{ width: 24, height: 24 }}/>)
        }}/>
      <Drawer.Screen name={ViewsName.viewDespesas} component={DespesasView} 
        options={{
          drawerLabel: "Listar Despesas",
          drawerIcon: () => (<Image source={require('../../assets/images/icon_despesas_on.png')} style={{ width: 24, height: 24 }}/>)
        }}/>
      <Drawer.Screen name={ViewsName.viewReceitas} component={ReceitasView} 
        options={{
          drawerLabel: "Listar Receitas",
          drawerIcon: () => (<Image source={require('../../assets/images/icon_receitas_on.png')} style={{ width: 24, height: 24 }}/>)
        }}/>
      <Drawer.Screen name={ViewsName.viewPerfilUsuario} component={PerfilUsuarioView} 
        options={{
          drawerLabel: "Perfil do Usuário",
          drawerIcon: () => (<Image source={require('../../assets/images/icon_perfilusuario_on.png')} style={{ width: 24, height: 24 }}/>)
        }}/>
      <Drawer.Screen name={ViewsName.viewConfiguracao} component={ConfiguracoesView}  
        options={{
          drawerLabel: "Configurações",
          drawerIcon: () => (<Image source={require('../../assets/images/icon_configuracao_on.png')} style={{ width: 24, height: 24 }}/>)
        }}/>
      <Drawer.Screen name={ViewsName.viewSobreAplicacao} component={SobreAplicacaoView}  
        options={{
          drawerLabel: "Sobre a Aplicação",
          drawerIcon: () => (<Image source={require('../../assets/images/icon_dinheiro_on.png')} style={{ width: 24, height: 24 }}/>)
        }}/>
      <Drawer.Screen name={ViewsName.viewHome} component={HomeView}  
        options={{
          drawerLabel: "Sair da aplicação",
          drawerIcon: () => (<Image source={require('../../assets/images/icon_sair_on.png')} style={{ width: 24, height: 24 }}/>)
        }}/>
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
    backgroundColor: Colors.bgColorDrawer,
  }
});