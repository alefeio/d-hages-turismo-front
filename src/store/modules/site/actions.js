export function siteRequest(client) {
  return {
    type: '@site/SITE_REQUEST',
    payload: { client },
  };
}

export function siteSucesso(data) {
  return {
    type: '@site/SITE_SUCESSO',
    payload: { data },
  };
}

export function falha() {
  return {
    type: '@site/FALHA',
  };
}
