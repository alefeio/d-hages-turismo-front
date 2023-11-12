import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  logado: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/LOGIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/LOGIN_SUCESSO': {
        draft.token = action.payload.token;
        draft.logado = true;
        draft.loading = false;
        break;
      }
      case '@auth/FALHA': {
        draft.loading = false;
        break;
      }
      case '@auth/LOGOUT': {
        draft.token = null;
        draft.logado = false;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
