import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import Button from '../componentes/Button';

const DashboardView = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.title]}>GFin - Gerenciador Financeiro</Text>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={[styles.text, styles.title]}>Dashboard</Text>
                    <Text style={[styles.text]}>
                    DrawerNavigator reference
DrawerNavigator(RouteConfigs, DrawerNavigatorConfig);

RouteConfigs
The route configs object is a mapping from route name to a route config, which tells the navigator what to present for that route, see example from StackNavigator.

DrawerNavigatorConfig
drawerWidth - Width of the drawer or a function returning it.
drawerPosition - Options are left or right. Default is left position.
contentComponent - Component used to render the content of the drawer, for example, navigation items. Receives the navigation prop for the drawer. Defaults to DrawerItems. For more information, see below.
contentOptions - Configure the drawer content, see below.
useNativeAnimations - Enable native animations. Default is true.
drawerBackgroundColor - Use the Drawer background for some color. The Default is white.
Several options get passed to the underlying router to modify navigation logic:

initialRouteName - The routeName for the initial route.
order - Array of routeNames which defines the order of the drawer items.
paths - Provide a mapping of routeName to path config, which overrides the paths set in the routeConfigs.
backBehavior - Should the back button cause switch to the initial route? If yes, set to initialRoute, otherwise none. Defaults to initialRoute behavior.
DrawerNavigator reference
DrawerNavigator(RouteConfigs, DrawerNavigatorConfig);

RouteConfigs
The route configs object is a mapping from route name to a route config, which tells the navigator what to present for that route, see example from StackNavigator.

DrawerNavigatorConfig
drawerWidth - Width of the drawer or a function returning it.
drawerPosition - Options are left or right. Default is left position.
contentComponent - Component used to render the content of the drawer, for example, navigation items. Receives the navigation prop for the drawer. Defaults to DrawerItems. For more information, see below.
contentOptions - Configure the drawer content, see below.
useNativeAnimations - Enable native animations. Default is true.
drawerBackgroundColor - Use the Drawer background for some color. The Default is white.
Several options get passed to the underlying router to modify navigation logic:

initialRouteName - The routeName for the initial route.
order - Array of routeNames which defines the order of the drawer items.
paths - Provide a mapping of routeName to path config, which overrides the paths set in the routeConfigs.
backBehavior - Should the back button cause switch to the initial route? If yes, set to initialRoute, otherwise none. Defaults to initialRoute behavior.
DrawerNavigator reference
DrawerNavigator(RouteConfigs, DrawerNavigatorConfig);

RouteConfigs
The route configs object is a mapping from route name to a route config, which tells the navigator what to present for that route, see example from StackNavigator.

DrawerNavigatorConfig
drawerWidth - Width of the drawer or a function returning it.
drawerPosition - Options are left or right. Default is left position.
contentComponent - Component used to render the content of the drawer, for example, navigation items. Receives the navigation prop for the drawer. Defaults to DrawerItems. For more information, see below.
contentOptions - Configure the drawer content, see below.
useNativeAnimations - Enable native animations. Default is true.
drawerBackgroundColor - Use the Drawer background for some color. The Default is white.
Several options get passed to the underlying router to modify navigation logic:

initialRouteName - The routeName for the initial route.
order - Array of routeNames which defines the order of the drawer items.
paths - Provide a mapping of routeName to path config, which overrides the paths set in the routeConfigs.
backBehavior - Should the back button cause switch to the initial route? If yes, set to initialRoute, otherwise none. Defaults to initialRoute behavior.
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.button_flutuante}>
                <Button label="Nova Despesa" onClick={() => (console.log("Nova despesa..."))}/>
            </View>
        </View>
    );
}
export default DashboardView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColorApp,
        flex: 1,
    },
    button_flutuante: {
        position: 'absolute',
        bottom: 50,
        right: 30 
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
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 5,
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