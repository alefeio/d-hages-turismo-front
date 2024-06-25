export const extrairDominioDaURLAtual = () => {
  try {
    const urlObj = new URL(
      window.location.href === 'http://localhost:3000/'
        // ? 'https://tafechado.org.br/'
        ? 'https://linsemouraadvocacia.com.br/'
        // ? 'https://dhagesturismo.com.br/'
        // ? 'https://iopa.com.br/'
        : window.location.href
    );
    // const urlObj = new URL('https://tafechado.org.br/');
    return urlObj.hostname.replace(/^www\./, '').split('.')[0];
  } catch (error) {
    console.error('Erro ao extrair o domínio da URL atual');
    return '';
  }
};
