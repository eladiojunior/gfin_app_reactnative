export default class UsuarioModel {
    constructor(id, nome, email, senha, salt_senha, imagem, dt_registro) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.salt_senha = salt_senha;
        this.imagem = imagem;
        this.dt_registro = dt_registro;
    }
}