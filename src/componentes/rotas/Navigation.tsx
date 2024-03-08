import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Views
import ViewsName from "../../constants/ViewsName";
import HomeView from "../../views/HomeView";
import CadastroView from "../../views/CadastroView";
import LoginView from "../../views/LoginView";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerTitle: '',headerShown: false}}>
          <Stack.Screen name={ViewsName.viewHome} component={HomeView} />
          <Stack.Screen name={ViewsName.viewLogin} component={LoginView} />
          <Stack.Screen name={ViewsName.viewCadastro} component={CadastroView} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default Navigation;