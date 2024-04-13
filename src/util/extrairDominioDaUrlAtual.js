export const extrairDominioDaURLAtual = () => {
  try {
<<<<<<< HEAD
    // const urlObj = new URL(window.location.href);
    const urlObj = new URL('https://linsemouraadvocacia.com.br/');
=======
    const urlObj = new URL(window.location.href);
    // const urlObj = new URL('https://dhagesturismo.com.br/');
>>>>>>> 549a00c8884d73cbf9e83a1b36da9b525c08ddac
    return urlObj.hostname.replace(/^www\./, '').split('.')[0];
  } catch (error) {
    console.error('Erro ao extrair o domínio da URL atual');
    return '';
  }
};
