import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

// import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';

import GlobalStyle from './styles/global';
import GlobalContext from './context';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalContext>
          <Router history={history}>
            <Routes />
            <GlobalStyle />
            <ToastContainer autoClose={3000} />
          </Router>
        </GlobalContext>
      </PersistGate>
    </Provider>
  );
}

export default App;
