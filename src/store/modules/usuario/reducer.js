import produce from 'immer';

const INITIAL_STATE = {
  perfil: null,
};

export default function usuario(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/LOGIN_SUCESSO': {
        draft.perfil = action.payload.usuario;
        break;
      }
      case '@usuario/UPDATE_PERFIL_SUCESSO': {
        draft.perfil = action.payload.perfil;
        break;
      }
      case '@auth/LOGOUT': {
        draft.perfil = null;
        break;
      }
      default:
    }
  });
}
