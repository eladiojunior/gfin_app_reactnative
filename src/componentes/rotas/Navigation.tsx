import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ViewsName from "../../constants/ViewsName";

//Views
import HomeView from "../../views/HomeView";
import CadastroView from "../../views/CadastroView";
import LoginView from "../../views/LoginView";

const Stack = createStackNavigator();
/*
const Tab = createBottomTabNavigator();
function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false }}>
            <Tab.Screen name="Dashboard" component={DashboarView}
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../assets/pets-green.png')} style={{ width: 24, height: 24 }} />
                    )
                }} />
            <Tab.Screen name="Mensagem" component={Mensagem}
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../assets/mensagens.png')} style={{ width: 24, height: 24 }} />
                    )
                }} />
        </Tab.Navigator>
    );
}
*/
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName={ViewsName.viewHome}
                screenOptions={{headerTitle: '',headerShown: false}}>
                <Stack.Screen name={ViewsName.viewHome} component={HomeView} />
                <Stack.Screen name={ViewsName.viewLogin} component={LoginView} />
                <Stack.Screen name={ViewsName.viewCadastro} component={CadastroView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}