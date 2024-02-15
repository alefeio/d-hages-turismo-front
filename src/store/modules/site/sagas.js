import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { siteSucesso, falha } from './actions';

export function* dataSite({ payload }) {
  try {
    const { client } = payload;

    const response = yield call(api.get, `site?client=${client}`);

    const data = response.data;

    yield put(siteSucesso(data));
  } catch (error) {
    toast.error('Falha na autenticação! Verifique seus dados.');
    yield put(falha());
  }
}

export default all([
  takeLatest('@site/SITE_REQUEST', dataSite),
]);
