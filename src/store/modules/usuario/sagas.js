import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updatePerfilSucesso, updatePerfilFalha } from './actions';

export function* updatePerfil({ payload }) {
  try {
    const { nome, email, img_id, ...rest } = payload.data;

    const perfil = Object.assign(
      { nome, email, img_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'usuarios', perfil);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updatePerfilSucesso(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar o perfil. Tente novamente!');
    yield put(updatePerfilFalha());
  }
}

export default all([
  takeLatest('@usuario/UPDATE_PERFIL_REQUEST', updatePerfil),
]);
