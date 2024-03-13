import SQLite from 'react-native-sqlite-storage';
import SqlGfin from '../constants/SqlGfin';
SQLite.DEBUB(true);
SQLite.enablePromise(true);

const database_name = 'gfin.db';
const database_version = '1.0';
const database_displayname = 'BD do Gerenciador Financeiro';
const database_size = 200000; //Tamanho do banco de dados

const AppSQLiteStorage = () => {
    
    /**
     * Realiza uma conexão com o banco de dados da aplicação.
     * @returns instância 'db' do banco de dados SQLite do GFin.
     */
    const connectDb = () => {
        let db;
        return new Promise((resolve:any) => {
            console.log('Checando a integridade do plugin...');
            SQLite.echoTest().then(() => {
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then((DB:any) => {
                    db = DB;
                    db.executeSql(SqlGfin.select_Usuario).then(() => {
                        console.log("Banco de dados está pronto... Verificação concluída!");
                    }).catch(() => {
                        console.log("Banco de dados não está pronto... Criar estrutura de dados.");
                        db.transaction((tx: any) => {
                            tx.executeSql(SqlGfin.create_tbUsuario);
                        }).then(() => {
                            console.log("Tabela: Tb_Usuarios criada com sucesso.");
                        }).catch((error:any) => {
                            console.log("Erro [transaction]: " + error);
                        });
                    });
                    resolve(db);
                }).catch((error:any) => {
                    console.log("Erro [openDatabase]: " + error);
                });
            }).catch((error:any) => {
                console.log("Erro [echoTest]: " + error);
            });
            desconnectDb(db);
        });
    };

    /**
     * Desconecta o banco de dados do GFin.
     * @param db - instância do banco de dados.
     */
    const desconnectDb = (db:any) => {
        if (db) {
            console.log("Fechar conexão com o banco de dados.");
            db.close().then( (status:any) => {
                console.log("Banco de dados desconectado!");
            }).catch((error:any) => {
                console.log("Erro [close]: " + error);
            });
        } else {
            console.log("Não existe conexão aberta.");
        }
    };

}
export default AppSQLiteStorage;