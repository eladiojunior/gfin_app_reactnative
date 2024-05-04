import SqlGfin from "../../constants/SqlGfin";
import Storage from "../AppSQLiteStorage"

import UsuarioLog from '../models/UsuarioLogModel';

const UsuarioLogRepository = {

    /**
     * Registra um log de usuário no banco de dados do Gfin.
     * @param idUsuario Id do usuário responsavel pelo Log.
     * @param itemLog Item/menu que o usuário acessou para regstro do log.
     * @param acaoLog Informar a acao realizada pelo usuário para regstro do log.
     */
    registrar: async (idUsuario: number, itemLog: string, acaoLog: string) => {
        let db;
        try {
            db = await Storage.connectToDatabase();
            const result = await db.executeSql(SqlGfin.insert_LogUsuario, [idUsuario, itemLog, acaoLog]);
            return result;
        } catch (error) {
            console.log(error);
            console.error("Error [registrarUsuarioLog]: ", error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    },

    /**
     * Lista os logs de usuários por um Id específico.
     * @param idUsuario identificador do usuário.
     * @returns lista de usuários registrados.
     */
    listar: async (idUsuario: any): Promise<UsuarioLog[] | null> => {
        let db;
        const lista: UsuarioLog[] = [];
        try {
            db = await Storage.connectToDatabase();
            const results = await db.executeSql(SqlGfin.selectById_LogUsuario, [idUsuario]);
            let resultRows = results[0];
            for (let i = 0; i < resultRows?.rows?.length; i++) {
                let item = resultRows?.rows.item(i);
                const result = new UsuarioLog(item.id_usuario_log, item.id_usuario, item.nm_item_log, item.nm_acao_log, item.dh_registro_log);
                lista.push(result);
            }
            return lista;
        } catch (error) {
            throw Error("Error [listarLogsUsuarios]: " + error);
        } finally {
            Storage.desconnectDatabase(db);
        }
    },

};
export default UsuarioLogRepository;