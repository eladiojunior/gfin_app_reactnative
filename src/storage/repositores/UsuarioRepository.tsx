import SqlGfin from "../../constants/SqlGfin";
import storage from "../AppSQLiteStorage"

import Usuario from '../models/UsuarioModel';

const UsuarioRepository = {

    /**
     * Registra um usuário no banco de dados do Gfin.
     * @param item informações do usuário para registro.
     */
    registrar: (item: Usuario) => {
        return new Promise((resolve: any) => {
            storage.connectDb().then((db: any) => {
                db.transaction((tx: any) => {
                    tx.executeSql(SqlGfin.insert_Usuario, [item.nome, item.email, item.senha, item.salt_senha, item.imagem])
                        .then(([tx, results]) => {
                            resolve(results);
                        });
                }).then(() => {
                    storage.desconnectDb(db);
                }).catch((error: any) => {
                    console.log("Error [registrar]: " + error)
                });
            });
        });
    },

    /**
     * Lista os usuários registrados.
     * @returns lista de usuários registrados.
     */
    listar: () => {
        return new Promise((resolve: any) => {
            const lista = [];
            storage.connectDb().then((db: any) => {
                db.transaction((tx: any) => {
                    tx.executeSql(SqlGfin.selectAll_Usuario, [])
                        .then(([tx, results]) => {
                            for (let i = 0; i < results.rows.length; i++) {
                                let item = results.rows.item(i);
                                const result = new Usuario(item.id_usuario, item.nm_usuario, item.tx_email, item.tx_senha, item.tx_salt_senha, item.imagem, item.dt_registro);
                                lista.push(result);
                            }
                            resolve(lista);
                        });
                }).then(() => {
                    storage.desconnectDb(db);
                }).catch((error: any) => {
                    console.log("Error [listar]: " + error)
                });
            });
        });
    },

    /**
     * Recupera um usuário pelo ID do banco de dados.
     * @param id identificador do usuário.
     * @returns Objeto de usuário ou null (se não encontrado);
     */
    obterPorId: (id: any) => {
        return new Promise((resolve: any) => {
            storage.connectDb().then((db: any) => {
                db.transaction((tx: any) => {
                    tx.executeSql(SqlGfin.selectById_Usuario, [id]).then(([tx, results]) => {
                        if (results.rows.length > 0) {
                            let item = results.rows.item(0);
                            const result = new Usuario(item.id_usuario, item.nm_usuario, item.tx_email, item.tx_senha, item.tx_salt_senha, item.imagem, item.dt_registro);
                            resolve(result);
                        }
                    });
                }).then(() => {
                    storage.desconnectDb(db);
                }).catch((error: any) => {
                    console.log("Error [obterPorId]: " + error)
                });
            });
        });
    },

    /**
     * Altera a informação de nome do usuário.
     * @param id identificador do usuário.
     * @param novo_nome Novo nome do usuário para alteração.
     * @returns 
     */
    alterarNome: (id: any, novo_nome: string) => {
        return new Promise((resolve: any) => {
            storage.connectDb().then((db: any) => {
                db.transaction((tx: any) => {
                    tx.executeSql(SqlGfin.update_NomeUsuario, [novo_nome, id]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then(() => {
                    storage.desconnectDb(db);
                }).catch((error: any) => {
                    console.log("Error [alterarNome]: " + error)
                });
            });
        });
    },

    /**
     * [Cuidado] Remove os dados do usuário do banco de dados.
     * @param id identificador do usuário.
     * @returns 
     */
    excluir: (id: any) => {
        return new Promise((resolve: any) => {
            storage.connectDb().then((db: any) => {
                db.transaction((tx: any) => {
                    tx.executeSql(SqlGfin.delete_Usuario, [id]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then(() => {
                    storage.desconnectDb(db);
                }).catch((error: any) => {
                    console.log("Error [excluir]: " + error)
                });
            });
        });
    }

};