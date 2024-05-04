/**
 * Start aplicativo GFin
 * @author Eladio Júnior
 */
import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Platform,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './componentes/rotas/Navigation';
import Storage from "./storage/AppSQLiteStorage"
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const loadDatabase = useCallback(async () => {
    try {
      const db = await Storage.connectToDatabase();
      await Storage.createTablesDatabase(db);
    } catch (error) {
      console.error(error)
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    loadDatabase();
  }, [loadDatabase]);

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Navigation />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;