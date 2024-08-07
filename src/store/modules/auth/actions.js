export function loginRequest(email, password, client) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { email, password, client },
  };
}

export function loginSucesso(token, usuario) {
  return {
    type: '@auth/LOGIN_SUCESSO',
    payload: { token, usuario },
  };
}

export function cadastroRequest(nome, email, password, admin, codigo_up, client) {
  return {
    type: '@auth/CADASTRO_REQUEST',
    payload: { nome, email, password, admin, codigo_up, client },
  };
}

export function falha() {
  return {
    type: '@auth/FALHA',
  };
}

export function logout() {
  return {
    type: '@auth/LOGOUT',
  };
}
