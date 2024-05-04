import SqlGfin from "../../constants/SqlGfin";
import Storage from "../AppSQLiteStorage"

import Usuario from '../models/UsuarioModel';

const UsuarioRepository = {

    /**
     * Registra um usuário no banco de dados do Gfin.
     * @param item informações do usuário para registro.
     */
    registrar: async (item: Usuario) => {
        let db;
        try {
            let id_usuario = 0;
            db = await Storage.connectToDatabase();
            const result = await db.executeSql(SqlGfin.insert_Usuario, [item.nome, item.email, item.senha, item.salt_senha]);
            if (result !=null && result[0].rowsAffected === 1)
                id_usuario = result[0].insertId;
            return id_usuario;
        } catch (error) {
            throw Error("Error [registrarUsuario]: " + error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    },

    /**
     * Lista os usuários registrados.
     * @returns lista de usuários registrados.
     */
    listar: async (): Promise<Usuario[] | null> => {
        let db;
        const lista: Usuario[] = [];
        try {
            db = await Storage.connectToDatabase();
            const results = await db.executeSql(SqlGfin.selectAll_Usuario, []);
            let resultRows = results[0];
            for (let i = 0; i < resultRows?.rows?.length; i++) {
                let item = resultRows?.rows.item(i);
                console.log(item);
                const result = new Usuario(item.id_usuario, item.nm_usuario, item.tx_email, item.tx_senha, item.tx_salt_senha, item.imagem, item.dh_ultimo_login, item.dh_registro);
                lista.push(result);
            }
            return lista;
        } catch (error) {
            throw Error("Error [listarUsuarios]: " + error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    },

    /**
     * Recupera um usuário pelo ID do banco de dados.
     * @param id identificador do usuário.
     * @returns Objeto de usuário ou null (se não encontrado);
     */
    obterPorId: async (id: any): Promise<Usuario | null> => {
        let db;
        try {
            db = await Storage.connectToDatabase();
            let resultItem: Usuario | null = null;
            const results = await db.executeSql(SqlGfin.selectById_Usuario, [id]);
            let resultRows = results[0];
            if (resultRows?.rows?.length > 0) {
                let item = resultRows?.rows.item(0);
                resultItem = new Usuario(item.id_usuario, item.nm_usuario, item.tx_email, item.tx_senha, item.tx_salt_senha, item.imagem, item.dh_ultimo_login, item.dh_registro);
            }
            return resultItem;
        } catch (error) {
            throw Error("Error [obterUsuarioPorId]: " + error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    },

    /**
     * Recupera um usuário pelo e-mail do banco de dados.
     * @param email e-mail do usuário.
     * @returns Objeto de usuário ou null (se não encontrado);
     */
    obterPorEmail: async (email: string): Promise<Usuario | null> => {
        let db;
        try {
            db = await Storage.connectToDatabase();
            let resultItem: Usuario | null = null;
            const results = await db.executeSql(SqlGfin.selectByEmail_Usuario, [email]);
            let resultRows = results[0];
            if (resultRows?.rows?.length > 0) {
                let item = resultRows?.rows.item(0);
                resultItem = new Usuario(item.id_usuario, item.nm_usuario, item.tx_email, item.tx_senha, item.tx_salt_senha, item.imagem, item.dh_ultimo_login, item.dh_registro);
            }
            return resultItem;
        } catch (error) {
            throw Error("Error [obterUsuarioPorEmail]: " + error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    },

    /**
     * Altera a informação de nome do usuário.
     * @param id identificador do usuário.
     * @param novo_nome Novo nome do usuário para alteração.
     * @returns 
     */
    alterarNome: async (id: any, novo_nome: string) => {
        let db;
        try {
            db = await Storage.connectToDatabase();
            const result = await db.transaction((tx) => {
                return tx.executeSql(SqlGfin.update_NomeUsuario, [novo_nome, id]);
            });
            return result;
        } catch (error) {
            throw Error("Error [alterarNomeUsuario]: " + error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    },

    /**
     * Altera foto do perfil do usuário pelo ID.
     * @param id identificador do usuário.
     * @param nova_imagem_usuario Novo imagem do usuário para alteração.
     * @returns 
     */
    alterarFotoPerfil: async (id: any, nova_foto_usuario: any) => {
        let db;
        try {
            db = await Storage.connectToDatabase();
            const result = await db.transaction((tx) => {
                return tx.executeSql(SqlGfin.update_FotoUsuario, [nova_foto_usuario, id]);
            });
            return result;
        } catch (error) {
            throw Error("Error [alterarFotoPerfilUsuario]: " + error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    },

    /**
     * Altera ultimo login do usuário pelo ID.
     * @param id identificador do usuário.
     * @returns 
     */
    alterarUltimoLogin: async (id: any) => {
        let db;
        try {
            db = await Storage.connectToDatabase();
            const result = await db.transaction((tx) => {
                return tx.executeSql(SqlGfin.update_UltimoLoginUsuario, [id]);
            });
            return result;
        } catch (error) {
            throw Error("Error [alterarUltimoLoginUsuario]: " + error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    },

    /**
     * [Cuidado] Remove os dados do usuário do banco de dados.
     * @param id identificador do usuário.
     * @returns 
     */
    excluir: async (id: any) => {
        let db;
        try {
            db = await Storage.connectToDatabase();
            const result = await db.transaction((tx) => {
                return tx.executeSql(SqlGfin.delete_Usuario, [id]);
            });
            return result;
        } catch (error) {
            throw Error("Error [excluirUsuario]: " + error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    }
};
export default UsuarioRepository;