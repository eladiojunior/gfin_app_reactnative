import { ImageBackground, StyleSheet } from 'react-native';

export default function ViewBase({ children }) {
    return <ImageBackground
        source={require('../assets/images/fundo.png')}
        style={styles.backgroundImage}
        imageStyle={{
            resizeMode: "cover",
            height: 300, // the image height
            top: 0,
        }}
    >{children}</ImageBackground>
}
const styles = StyleSheet.create({
    backgroundImage: {
        height: '100%',
    },
});