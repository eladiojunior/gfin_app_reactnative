import SQLite, { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import SqlGfin from '../constants/SqlGfin';

const database_name = 'gfin.db';
const database_location = 'default';
const database_version = '1.0';
const database_displayname = 'BD do Gerenciador Financeiro';
const database_size = 200000; //Tamanho do banco de dados

SQLite.enablePromise(true);

const AppSQLiteStorage = {

    createTablesDatabase: async (db: SQLiteDatabase) => {
        try {
            await db.executeSql(SqlGfin.create_Usuario);
            await db.executeSql(SqlGfin.create_UsuarioLog);
        } catch (error) {
            console.error(error)
            throw Error('Erro na criação da estrutura de tabelas.');
        } finally {
            AppSQLiteStorage.desconnectDatabase(db);
        }
    },
    connectToDatabase: async () => {
        return SQLite.openDatabase(
            { name: database_name, location: database_location },
            () => {
                //console.log("Conexão realizada.");
            },
            (error) => {
                console.log(error);
                throw Error('Erro na conexão com o banco de dados.');
            });
    },

    /**
     * Desconecta o banco de dados do GFin.
     * @param db - instância do banco de dados.
     */
    desconnectDatabase: (db: any) => {
        if (db) {
            db.close().then((status: any) => {
                //console.log("Desconexão realizada!");
            }).catch((error: any) => {
                console.log("Erro [close]: " + error);
            });
        } else {
            console.log("Não existe conexão aberta.");
        }
    },


}
export default AppSQLiteStorage;