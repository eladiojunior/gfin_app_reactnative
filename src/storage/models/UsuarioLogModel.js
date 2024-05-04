export default class UsuarioLogModel {
    constructor(id, id_usuario, nm_item_log, nm_acao_log, dh_registro_log) {
        this.id = id;
        this.id_usuario = id_usuario;
        this.nm_item_log = nm_item_log;
        this.nm_acao_log = nm_acao_log;
        this.salt_senha = salt_senha;
        this.dh_registro_log = dh_registro_log;
    }
}