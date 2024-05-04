export default {
    
  //Estrutura de dados da aplicação.
  create_Usuario: 'CREATE TABLE IF NOT EXISTS tb_usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nm_usuario TEXT, tx_email TEXT, tx_senha TEXT, tx_salt_senha TEXT, img_usuario TEXT, dh_ultimo_login TEXT, dh_registro TEXT)',
  create_UsuarioLog: 'CREATE TABLE IF NOT EXISTS tb_usuario_log (id_usuario_log INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER, nm_item_log TEXT, nm_acao_log TEXT, dh_registro_log TEXT)',

  //Operações da estrutura de Usuário da aplicação.
  selectVerified_Usuario: 'SELECT 1 FROM tb_usuario LIMIT 1',
  selectAll_Usuario: 'SELECT id_usuario, nm_usuario, tx_email, tx_senha, tx_salt_senha, img_usuario, dh_ultimo_login, dh_registro FROM tb_usuario',
  selectById_Usuario: 'SELECT id_usuario, nm_usuario, tx_email, tx_senha, tx_salt_senha, img_usuario, dh_ultimo_login, dh_registro FROM tb_usuario WHERE id_usuario = ?',
  selectByEmail_Usuario: 'SELECT id_usuario, nm_usuario, tx_email, tx_senha, tx_salt_senha, img_usuario, dh_ultimo_login, dh_registro FROM tb_usuario WHERE tx_email = ?',
  insert_Usuario: 'INSERT INTO tb_usuario (nm_usuario, tx_email, tx_senha, tx_salt_senha, img_usuario, dh_ultimo_login, dh_registro) VALUES (?, ?, ?, ?, null, datetime(\'now\'), datetime(\'now\'))',
  update_NomeUsuario: 'UPDATE tb_usuario SET nm_usuario = ? WHERE id_usuario = ?',
  update_FotoUsuario: 'UPDATE tb_usuario SET img_usuario = ? WHERE id_usuario = ?',
  update_SenhaUsuario: 'UPDATE tb_usuario SET tx_senha = ?, tx_salt_senha = ? WHERE id_usuario = ?',
  update_UltimoLoginUsuario: 'UPDATE tb_usuario SET dh_ultimo_login = datetime(\'now\') WHERE id_usuario = ?',
  delete_Usuario: 'DELETE FROM tb_usuario WHERE id_usuario = ?',

  //Operações da estrutura de Usuário Log da aplicação.
  insert_LogUsuario: 'INSERT INTO tb_usuario_log (id_usuario, nm_item_log, nm_acao_log, dh_registro_log) VALUES (?, ?, ?, datetime(\'now\'))',
  selectById_LogUsuario: 'SELECT id_usuario_log, id_usuario, nm_item_log, nm_acao_log, dh_registro_log FROM tb_usuario_log WHERE id_usuario = ?',

};