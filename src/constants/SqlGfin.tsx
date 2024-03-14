export default {
    
  //Estrutura de dados da aplicação.
  create_Usuario: 'CREATE TABLE IF NOT EXISTS tb_usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nm_nome VARCHAR(50), tx_email VARCHAR(50), tx_senha VARCHAR(100), tx_salt_senha VARCHAR(100), img_usuario TEXT, dh_registro DATETIME)',

  //Operações da estrutura de Usuário da aplicação.
  selectVerified_Usuario: 'SELECT 1 FROM tb_usuarios LIMIT 1',
  selectAll_Usuario: 'SELECT id_usuario, nm_nome, tx_email, tx_senha, tx_salt_senha, img_usuario, dh_registro FROM tb_usuarios',
  selectById_Usuario: 'SELECT id_usuario, nm_nome, tx_email, tx_senha, tx_salt_senha, img_usuario, dh_registro FROM tb_usuarios WHERE id_usuario = ?',
  insert_Usuario: 'INSERT INTO tb_usuarios (nm_nome, tx_email, tx_senha, tx_salt_senha, img_usuario, dh_registro) VALUES (?, ?, ?, ?, ?, datetime())',
  update_NomeUsuario: 'UPDATE tb_usuarios SET nm_nome = ? WHERE id_usuario = ?',
  update_FotoUsuario: 'UPDATE tb_usuarios SET img_usuario = ? WHERE id_usuario = ?',
  update_SenhaUsuario: 'UPDATE tb_usuarios SET tx_senha = ?, tx_salt_senha = ? WHERE id_usuario = ?',
  delete_Usuario: 'DELETE FROM tb_usuarios WHERE id_usuario = ?',

};