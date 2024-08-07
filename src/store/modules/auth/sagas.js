import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { loginSucesso, falha } from './actions';

export function* login({ payload }) {
  try {
    const { email, password, client } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
      client
    });

    const { token, usuario } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSucesso(token, usuario));

    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na autenticação! Verifique seus dados.');
    yield put(falha());
  }
}

export function* cadastro({ payload }) {
  try {
    const { nome, email, password, admin, codigo_up, client } = payload;

    yield call(api.post, 'usuarios', {
      nome,
      email,
      password,
      admin,
      codigo_up,
      client
    });

    const response = yield call(api.post, 'sessions', {
      email,
      password,
      client
    });

    const { token, usuario } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSucesso(token, usuario));

    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha no cadastro! Verifique seus dados.');

    yield put(falha());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function logout() {
  history.push('/login');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/LOGIN_REQUEST', login),
  takeLatest('@auth/CADASTRO_REQUEST', cadastro),
  takeLatest('@auth/LOGOUT', logout),
]);
