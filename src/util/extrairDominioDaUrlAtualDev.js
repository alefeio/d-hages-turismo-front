export const extrairDominioDaURLAtual = () => {
  try {
    const urlObj = new URL('https://tafechado.org.br/');
    return urlObj.hostname.replace(/^www\./, '').split('.')[0];
  } catch (error) {
    console.error('Erro ao extrair o domínio da URL atual');
    return '';
  }
};
