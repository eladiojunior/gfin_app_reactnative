import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Repository = {
    
    /**
     * Realiza a gravação do conteúdo em Storage do dispositovo.
     * @param repo - Nome do repositório.
     * @param item - item a ser gravado.
     * @param callback - metodo de callback (hasErro:{true|false}, erro:{error|null});
     */
    gravar:async (repo:string, item:any, callback:any) => {
        let nameRepository = "@gfin:" + repo;
        try 
        {
            //Recuperar os registros existentes...
            Repository.listar(repo, async (lista:any) => {
                const itens = [...lista, item];
                //Apos adicionado um novo, gravar.
                let json = JSON.stringify(itens);
                await AsyncStorage.setItem(nameRepository, json);
                if (callback)
                    callback(false, null);
            });
        } catch (e) {
            if (callback)
                callback(true, e);
        }

    },

    /**
     * Lista os objetos de um repositório.
     * @param repo - Nome do repositório.
     * @param callback - Metodo callback (lista:[]);
     */
    listar:async (repo:string, callback:any) => {
        let nameRepository = "@gfin:" + repo;
        try 
        {
            const json = await AsyncStorage.getItem(nameRepository);
            let obj = (json ? JSON.parse(json) : []);
            if (callback) 
                callback(obj);
        } catch (e) {
            console.log(e);
            if (callback)
                callback({});
        }
    },

    /**
     * Obter um objeto de um repositório.
     * @param repo - Nome do repositório.
     * @param callback - Metodo callback (obter:[]);
     */
    obter:async (repo:string, callback:any) => {
        let nameRepository = "@gfin:" + repo;
        try 
        {
            const json = await AsyncStorage.getItem(nameRepository);
            let obj = (json ? JSON.parse(json) : null);
            if (callback) 
                callback(obj);
        } catch (e) {
            console.log(e);
            if (callback)
                callback({});
        }
    },

    removerTudo:async (repo:string) => {
        let nameRepository = "@gfin:" + repo;
        try 
        {
            await AsyncStorage.removeItem(nameRepository);
        } catch (e) {
            console.log(e);
        }
    }

}
export default Repository;