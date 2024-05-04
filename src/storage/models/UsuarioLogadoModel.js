export default class UsuarioLogadoModel {
    constructor(id, nome, email, dh_ultimo_login, dh_login) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.dh_ultimo_login = dh_ultimo_login;
        this.dh_login = dh_login;
    }
}