import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  logado: false,
  loading: false,
};

export default function site(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@site/SITE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@site/SITE_SUCESSO': {
        draft.token = action.payload.token;
        draft.logado = true;
        draft.loading = false;
        break;
      }
      case '@site/FALHA': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
