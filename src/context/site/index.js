import React, { createContext, useEffect, useState } from "react";
import api from "~/services/api";
import { extrairDominioDaURLAtual } from "~/util/extrairDominioDaUrlAtual";

//Valor default do contexto
const DEFAULT_VALUE = {
  state: {
    name: "Alexandre",
    lastName: "Feio",
    email: "alefeio@gmail.com",
  },
  setState: () => {}, //função de inicialização
};

//criando nosso contexto SiteContext
const SiteContext = createContext(DEFAULT_VALUE);

/**
 * Função que irá conter o estado e função que irá alterar o estado 'setState'
 * quer irá prover o contexto para os componentes filhos da árvore
 */
const SiteContextProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  const [dominio, setDominio] = useState('');

  async function loadSite() {
    const response = await api.get(`site?client=${dominio}`);

    console.log(`site: ${JSON.stringify(response.data)}`);
    response.data && setState(response.data);
  }

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  useEffect(() => {
    loadSite();
  }, [dominio]);

  return (
    <SiteContext.Provider
      value={{
        state,
        loadSite
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
export { SiteContextProvider };
export default SiteContext;