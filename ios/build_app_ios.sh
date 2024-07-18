#!/bin/bash

# Defina os caminhos e variáveis
WORKSPACE="GfinApp.xcworkspace"
SCHEME="GFinAppScheme"
CONFIGURATION="Release"
OUTPUT_DIR="./ios/build"
APP_NAME="GFin"
APP_VERSION=$(/usr/libexec/PlistBuddy -c "Print CFBundleShortVersionString" "path/to/Info.plist")
IPA_NAME="${APP_NAME}-v${APP_VERSION}.ipa"

# Execute a construção
xcodebuild -workspace "$WORKSPACE" -scheme "$SCHEME" -configuration "$CONFIGURATION" -archivePath "$OUTPUT_DIR/$SCHEME.xcarchive" archive

# Verifique se a construção foi bem-sucedida
if [ $? -eq 0 ]; then
    # Exportar o arquivo .ipa
    xcodebuild -exportArchive -archivePath "$OUTPUT_DIR/$SCHEME.xcarchive" -exportPath "$OUTPUT_DIR" -exportOptionsPlist "ExportOptions.plist"
    
    # Verifique se a exportação foi bem-sucedida
    if [ $? -eq 0 ]; then
        # Encontre o arquivo .ipa gerado
        IPA_PATH=$(find "$OUTPUT_DIR" -name "*.ipa" | head -n 1)
        # Verifique se o arquivo .ipa foi encontrado
        if [ -n "$IPA_PATH" ]; then
            # Renomeie o arquivo .ipa
            mv "$IPA_PATH" "$OUTPUT_DIR/$IPA_NAME"
            echo "Arquivo .ipa renomeado para $IPA_NAME"
        else
            echo "Nenhum arquivo .ipa encontrado no diretório $OUTPUT_DIR"
        fi
    else
        echo "Falha na exportação do arquivo .ipa"
    fi
else
    echo "Falha na construção do arquivo .xcarchive"
fi