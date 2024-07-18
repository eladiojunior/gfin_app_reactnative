# Gfin-App-ReactNative

Projeto de aplicativo Mobile para gerenciamento financeiro pessoal de usuários, inicialmente esse app irá armazenar as informações localmente no dispositivo do usuário, vrs 1.0.0. Futuramente será possível manter as informações em banco de dados na nuvem de forma segura, podendo ser acessada as informações de qualquer outro dispositivo.

Autor: Eladio Júnior

E-mail: eladiojunior@gmail.com

`` Se gostou do projeto... pode fazer um PIX, chave é meu e-mail. ;) ``

## Compilando o projeto

Para rodar localmente precisa:
- Windows
    - Android Studio para rodar o emulador Android
    - ``/> npx react-native run-android``
- iOS
    - XCode para rodar o emulador iOS
    - ``/> npx react-native run-ios``

Para gerar um pacote de publicação:
- Windows
    - ``/> cd android``
    - ``/> cd app ``
    - ``/> keytool -genkey -v -keystore gfin-release-key.keystore -alias gfin-key-alias -keyalg RSA -keysize 2048 -validity 10000``
    - Informe a senha: **gfin2024**
    - ``/> cd .. `` //Retornar para pasta android;
    - ``/> ./gradlew assembleRelease`` //APK na pasta: android/app/build/outputs/apk/release/;

- iOS
    - /> ``cd ios``
    - /> ``.build_app_ios.sh`` //script customizado;
