export function loginRequest(email, password) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { email, password },
  };
}

export function loginSucesso(token, usuario) {
  return {
    type: '@auth/LOGIN_SUCESSO',
    payload: { token, usuario },
  };
}

export function cadastroRequest(nome, email, password) {
  return {
    type: '@auth/CADASTRO_REQUEST',
    payload: { nome, email, password },
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
