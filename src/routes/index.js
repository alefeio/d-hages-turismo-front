import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

import Perfil from '../pages/Perfil';
import Dashboard from '../pages/Dashboard';

import Home from '../pages/Home';
import Produtos from '../pages/Produtos';
import Compraevenda from '../pages/Compraevenda';
import Produto from '../pages/Produto';
import Taxiaereo from '../pages/Taxiaereo';
import Blog from '../pages/Blog';
import Pontos from '../pages/Pontos';
import Ponto from '../pages/Ponto';
import Busca from '../pages/Busca';
import Contatoforms from '../pages/Contatoforms';
import Sobre from '../pages/Sobre';
import Aeronaves from '../pages/Aeronaves';

import Contato from '../pages/Contato';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/produtos" exact component={Produtos} />
      <Route path="/compraevenda" exact component={Compraevenda} />
      <Route path="/sobre" exact component={Sobre} />
      <Route path="/aeronaves" exact component={Aeronaves} />
      <Route path="/busca" component={Busca} />
      <Route path="/produtos/:id" component={Produto} />
      <Route path="/taxiaereo" component={Taxiaereo} />
      <Route path="/blog" exact component={Blog} />
      <Route path="/blog/:id" component={Blog} />
      <Route path="/pontos" exact component={Pontos} />
      <Route path="/pontos/:id" component={Ponto} />
      <Route path="/contato" component={Contato} />
      <Route path="/contatoforms" component={Contatoforms} />
      <Route path="/login" component={Login} isLogado />
      <Route path="/cadastro" component={Cadastro} isLogado />
      <Route path="/perfil" component={Perfil} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}
