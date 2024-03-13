export default {
    
  //Estrutura de dados da aplicação.
  create_tbUsuario: 'CREATE TABLE IF NOT EXISTS tb_usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nm_nome VARCHAR(50), tx_email VARCHAR(50), tx_senha VARCHAR(100), tx_salt_senha VARCHAR(100), dh_registro DATETIME)',

  select_Usuario: 'SELECT 1 FROM tb_usuarios LIMIT 1',

};